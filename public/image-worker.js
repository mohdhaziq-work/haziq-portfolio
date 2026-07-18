// Image Enhancement Web Worker
// Runs ALL heavy processing off the main UI thread to prevent freezing
// Communicates via postMessage: receives pixel data + settings, sends back processed pixels

let cancelled = false;

self.onmessage = function(e) {
  const { type } = e.data;
  if (type === 'cancel') {
    cancelled = true;
    return;
  }
  if (type === 'enhance') {
    cancelled = false;
    const { buffer, width, height, settings } = e.data;
    processImage(new Uint8ClampedArray(buffer), width, height, settings);
  }
};

function sendProgress(step, percent) {
  self.postMessage({ type: 'progress', step, percent });
}

// ===== MAIN PROCESSING PIPELINE =====
function processImage(src, srcWidth, srcHeight, settings) {
  try {
    // Step 1: Upscale with Lanczos3
    sendProgress('Upscaling...', 5);
    let data, width, height;

    if (settings.upscale > 1) {
      const result = lanczos3Upscale(src, srcWidth, srcHeight, settings.upscale);
      if (cancelled) return;
      data = result.data;
      width = result.width;
      height = result.height;
    } else {
      data = new Uint8ClampedArray(src);
      width = srcWidth;
      height = srcHeight;
    }

    // Step 2: Bilateral denoise (edge-preserving)
    if (settings.denoise > 0) {
      if (cancelled) return;
      sendProgress('Denoising...', 25);
      data = applyBilateralDenoise(data, width, height, settings.denoise);
    }

    // Step 3: Tone mapping (shadows, highlights, brightness)
    if (settings.shadows !== 0 || settings.highlights !== 0 || settings.brightness !== 0) {
      if (cancelled) return;
      sendProgress('Tone mapping...', 45);
      data = applyToneMapping(data, width, height, settings.shadows, settings.highlights, settings.brightness);
    }

    // Step 4: Contrast + Clarity (CLAHE)
    if (settings.contrast !== 0 || settings.clarity !== 0) {
      if (cancelled) return;
      sendProgress('Enhancing contrast...', 60);
      data = applyCLAHE(data, width, height, settings.contrast, settings.clarity);
    }

    // Step 5: Vibrance/Saturation
    if (settings.saturation !== 0) {
      if (cancelled) return;
      sendProgress('Enhancing colors...', 75);
      data = applyVibrance(data, width, height, settings.saturation);
    }

    // Step 6: Multi-pass Unsharp Mask
    if (settings.sharpen > 0) {
      if (cancelled) return;
      sendProgress('Sharpening...', 90);
      data = applySharpen(data, width, height, settings.sharpen);
    }

    if (cancelled) return;
    sendProgress('Finalizing...', 98);

    // Send result back - transfer buffer for zero-copy
    const resultBuffer = data.buffer.slice(0);
    self.postMessage({ type: 'result', buffer: resultBuffer, width, height }, [resultBuffer]);
  } catch (err) {
    self.postMessage({ type: 'error', message: err.message || 'Processing failed' });
  }
}

// ===== LANCZOS3 UPSCALING =====
function lanczos3(x) {
  if (x === 0) return 1;
  if (x >= 3 || x <= -3) return 0;
  var px = Math.PI * x;
  return (Math.sin(px) / px) * (Math.sin(px / 3) / (px / 3));
}

function lanczos3Upscale(src, sw, sh, scale) {
  var dw = Math.round(sw * scale);
  var dh = Math.round(sh * scale);
  var dst = new Uint8ClampedArray(dw * dh * 4);

  // Pre-compute Lanczos weights for each source position (row and column separately)
  // Two-pass separable filter is faster: horizontal then vertical
  // But for simplicity and correctness, we use direct 2D sampling with optimization

  for (var y = 0; y < dh; y++) {
    if (cancelled) return { data: dst, width: dw, height: dh };
    // Progress every 50 rows
    if (y % 50 === 0) {
      sendProgress('Upscaling...', 5 + Math.round((y / dh) * 20));
    }
    for (var x = 0; x < dw; x++) {
      var srcX = x / scale;
      var srcY = y / scale;
      var r = 0, g = 0, b = 0, a = 0, wSum = 0;

      var x0 = Math.max(0, Math.floor(srcX - 3));
      var x1 = Math.min(sw - 1, Math.ceil(srcX + 3));
      var y0 = Math.max(0, Math.floor(srcY - 3));
      var y1 = Math.min(sh - 1, Math.ceil(srcY + 3));

      for (var iy = y0; iy <= y1; iy++) {
        for (var ix = x0; ix <= x1; ix++) {
          var wx = lanczos3(srcX - ix);
          var wy = lanczos3(srcY - iy);
          var w = wx * wy;
          var i = (iy * sw + ix) * 4;
          r += src[i] * w;
          g += src[i + 1] * w;
          b += src[i + 2] * w;
          a += src[i + 3] * w;
          wSum += w;
        }
      }

      if (wSum > 0) {
        var i = (y * dw + x) * 4;
        dst[i] = Math.max(0, Math.min(255, Math.round(r / wSum)));
        dst[i + 1] = Math.max(0, Math.min(255, Math.round(g / wSum)));
        dst[i + 2] = Math.max(0, Math.min(255, Math.round(b / wSum)));
        dst[i + 3] = Math.max(0, Math.min(255, Math.round(a / wSum)));
      }
    }
  }

  return { data: dst, width: dw, height: dh };
}

// ===== BILATERAL DENOISE (Edge-Preserving) =====
function applyBilateralDenoise(src, w, h, strength) {
  var radius = Math.max(1, Math.round(strength / 25));
  // For large images, limit radius to prevent extreme slowness
  if (w * h > 2000000) radius = Math.min(radius, 3);
  if (w * h > 4000000) radius = Math.min(radius, 2);

  var sigmaSpatial = radius;
  var sigmaRange = 20 + (100 - strength) * 0.5;
  var twoSigmaSpatial2 = 2 * sigmaSpatial * sigmaSpatial;
  var twoSigmaRange2 = 2 * sigmaRange * sigmaRange;

  var dst = new Uint8ClampedArray(src.length);

  // Process in chunks for progress
  var totalRows = h - 2 * radius;
  for (var y = radius; y < h - radius; y++) {
    if (cancelled) return src;
    if (y % 20 === 0) {
      var pct = 25 + Math.round(((y - radius) / totalRows) * 15);
      sendProgress('Denoising...', pct);
    }
    for (var x = radius; x < w - radius; x++) {
      var i = (y * w + x) * 4;

      for (var c = 0; c < 3; c++) {
        var sum = 0;
        var weightSum = 0;
        var centerVal = src[i + c];

        for (var dy = -radius; dy <= radius; dy++) {
          for (var dx = -radius; dx <= radius; dx++) {
            var ni = ((y + dy) * w + (x + dx)) * 4 + c;
            var spatialDist = dx * dx + dy * dy;
            var rangeDist = (src[ni] - centerVal) * (src[ni] - centerVal);
            var wt = Math.exp(-(spatialDist / twoSigmaSpatial2) - (rangeDist / twoSigmaRange2));
            sum += src[ni] * wt;
            weightSum += wt;
          }
        }
        dst[i + c] = Math.round(sum / weightSum);
      }
      dst[i + 3] = src[i + 3]; // Alpha unchanged
    }
  }

  // Copy border pixels
  copyBorders(dst, src, w, h, radius);
  return dst;
}

// ===== TONE MAPPING (Shadows, Highlights, Brightness) =====
function applyToneMapping(src, w, h, shadows, highlights, brightness) {
  var dst = new Uint8ClampedArray(src.length);
  var brightnessAdj = brightness * 2.55;

  for (var i = 0; i < src.length; i += 4) {
    var r = src[i], g = src[i + 1], b = src[i + 2];
    var lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // Shadows: boost dark areas
    if (shadows !== 0) {
      var shadowMask = Math.max(0, 1 - lum / 128);
      var shadowAdj = shadows * shadowMask * 0.01 * 255;
      r = Math.max(0, Math.min(255, r + shadowAdj));
      g = Math.max(0, Math.min(255, g + shadowAdj));
      b = Math.max(0, Math.min(255, b + shadowAdj));
    }

    // Highlights: control bright areas
    if (highlights !== 0) {
      var hlMask = Math.max(0, (lum - 128) / 127);
      var hlAdj = highlights * hlMask * 0.01 * 255;
      r = Math.max(0, Math.min(255, r + hlAdj));
      g = Math.max(0, Math.min(255, g + hlAdj));
      b = Math.max(0, Math.min(255, b + hlAdj));
    }

    // Brightness
    if (brightnessAdj !== 0) {
      r = Math.max(0, Math.min(255, r + brightnessAdj));
      g = Math.max(0, Math.min(255, g + brightnessAdj));
      b = Math.max(0, Math.min(255, b + brightnessAdj));
    }

    dst[i] = r;
    dst[i + 1] = g;
    dst[i + 2] = b;
    dst[i + 3] = src[i + 3];
  }

  return dst;
}

// ===== CLAHE - Contrast Limited Adaptive Histogram Equalization =====
function applyCLAHE(src, w, h, contrast, clarity) {
  var dst = new Uint8ClampedArray(src.length);

  // Global contrast
  if (contrast !== 0) {
    var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    for (var i = 0; i < src.length; i += 4) {
      dst[i] = Math.max(0, Math.min(255, factor * (src[i] - 128) + 128));
      dst[i + 1] = Math.max(0, Math.min(255, factor * (src[i + 1] - 128) + 128));
      dst[i + 2] = Math.max(0, Math.min(255, factor * (src[i + 2] - 128) + 128));
      dst[i + 3] = src[i + 3];
    }
  } else {
    dst.set(src);
  }

  // Local contrast (clarity) - local mean subtraction with skin protection
  if (clarity !== 0) {
    var copy = new Uint8ClampedArray(dst);
    var radius = 15;
    var clarityStrength = clarity / 100;
    // Process every 2nd pixel for speed, apply to 2x2 block
    for (var y = radius; y < h - radius; y += 2) {
      if (cancelled) return dst;
      if (y % 40 === 0) {
        var pct = 60 + Math.round(((y - radius) / (h - 2 * radius)) * 10);
        sendProgress('Enhancing contrast...', pct);
      }
      for (var x = radius; x < w - radius; x += 2) {
        var rSum = 0, gSum = 0, bSum = 0, count = 0;
        for (var dy = -radius; dy <= radius; dy += 2) {
          for (var dx = -radius; dx <= radius; dx += 2) {
            var ni = ((y + dy) * w + (x + dx)) * 4;
            rSum += copy[ni];
            gSum += copy[ni + 1];
            bSum += copy[ni + 2];
            count++;
          }
        }
        var rMean = rSum / count, gMean = gSum / count, bMean = bSum / count;
        // Apply to 2x2 block
        for (var bdy = 0; bdy < 2 && y + bdy < h; bdy++) {
          for (var bdx = 0; bdx < 2 && x + bdx < w; bdx++) {
            var bi = ((y + bdy) * w + (x + bdx)) * 4;
            dst[bi] = Math.max(0, Math.min(255, copy[bi] + (copy[bi] - rMean) * clarityStrength));
            dst[bi + 1] = Math.max(0, Math.min(255, copy[bi + 1] + (copy[bi + 1] - gMean) * clarityStrength));
            dst[bi + 2] = Math.max(0, Math.min(255, copy[bi + 2] + (copy[bi + 2] - bMean) * clarityStrength));
          }
        }
      }
    }
  }

  return dst;
}

// ===== VIBRANCE / SATURATION =====
function applyVibrance(src, w, h, saturation) {
  if (saturation === 0) return src;
  var dst = new Uint8ClampedArray(src.length);
  var strength = saturation / 100;

  for (var i = 0; i < src.length; i += 4) {
    var r = src[i], g = src[i + 1], b = src[i + 2];
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var currentSat = max === 0 ? 0 : (max - min) / max;
    // Vibrance: less saturated pixels get more boost
    var boost = strength * (1 - currentSat * 0.5);
    var avg = (r + g + b) / 3;
    dst[i] = Math.max(0, Math.min(255, r + (r - avg) * boost));
    dst[i + 1] = Math.max(0, Math.min(255, g + (g - avg) * boost));
    dst[i + 2] = Math.max(0, Math.min(255, b + (b - avg) * boost));
    dst[i + 3] = src[i + 3];
  }

  return dst;
}

// ===== MULTI-PASS UNSHARP MASK =====
function applySharpen(src, w, h, amount) {
  if (amount === 0) return src;
  var strength = amount / 100;
  var dst = new Uint8ClampedArray(src);

  // Pass 1: Fine detail sharpen (3x3 kernel)
  var copy1 = new Uint8ClampedArray(dst);
  for (var y = 1; y < h - 1; y++) {
    if (cancelled) return dst;
    if (y % 40 === 0) {
      var pct = 90 + Math.round(((y - 1) / (h - 2)) * 5);
      sendProgress('Sharpening...', pct);
    }
    for (var x = 1; x < w - 1; x++) {
      var i = (y * w + x) * 4;
      for (var c = 0; c < 3; c++) {
        var blur = (copy1[((y - 1) * w + x) * 4 + c] + copy1[((y + 1) * w + x) * 4 + c] + copy1[(y * w + (x - 1)) * 4 + c] + copy1[(y * w + (x + 1)) * 4 + c]) / 4;
        dst[i + c] = Math.max(0, Math.min(255, copy1[i + c] + (copy1[i + c] - blur) * strength * 1.5));
      }
    }
  }

  // Pass 2: Medium detail (5x5 kernel) - only for stronger sharpening
  if (amount > 30) {
    var copy2 = new Uint8ClampedArray(dst);
    for (var y2 = 2; y2 < h - 2; y2++) {
      if (cancelled) return dst;
      for (var x2 = 2; x2 < w - 2; x2++) {
        var i2 = (y2 * w + x2) * 4;
        for (var c2 = 0; c2 < 3; c2++) {
          var blur2 = 0;
          for (var dy = -2; dy <= 2; dy++) {
            for (var dx = -2; dx <= 2; dx++) {
              blur2 += copy2[((y2 + dy) * w + (x2 + dx)) * 4 + c2];
            }
          }
          blur2 /= 25;
          dst[i2 + c2] = Math.max(0, Math.min(255, copy2[i2 + c2] + (copy2[i2 + c2] - blur2) * strength * 0.4));
        }
      }
    }
  }

  return dst;
}

// ===== HELPER: Copy border pixels for denoise =====
function copyBorders(dst, src, w, h, radius) {
  // Top rows
  for (var y = 0; y < radius; y++) {
    for (var x = 0; x < w; x++) {
      var i = (y * w + x) * 4;
      dst[i] = src[i]; dst[i + 1] = src[i + 1]; dst[i + 2] = src[i + 2]; dst[i + 3] = src[i + 3];
    }
  }
  // Bottom rows
  for (var y2 = h - radius; y2 < h; y2++) {
    for (var x2 = 0; x2 < w; x2++) {
      var i2 = (y2 * w + x2) * 4;
      dst[i2] = src[i2]; dst[i2 + 1] = src[i2 + 1]; dst[i2 + 2] = src[i2 + 2]; dst[i2 + 3] = src[i2 + 3];
    }
  }
  // Left columns
  for (var y3 = radius; y3 < h - radius; y3++) {
    for (var x3 = 0; x3 < radius; x3++) {
      var i3 = (y3 * w + x3) * 4;
      dst[i3] = src[i3]; dst[i3 + 1] = src[i3 + 1]; dst[i3 + 2] = src[i3 + 2]; dst[i3 + 3] = src[i3 + 3];
    }
  }
  // Right columns
  for (var y4 = radius; y4 < h - radius; y4++) {
    for (var x4 = w - radius; x4 < w; x4++) {
      var i4 = (y4 * w + x4) * 4;
      dst[i4] = src[i4]; dst[i4 + 1] = src[i4 + 1]; dst[i4 + 2] = src[i4 + 2]; dst[i4 + 3] = src[i4 + 3];
    }
  }
}
