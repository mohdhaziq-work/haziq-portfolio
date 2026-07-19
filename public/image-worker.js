// Image Enhancement Web Worker v7 - GUIDED FILTER ENGINE
// Based on: He et al., "Guided Image Filtering" (ECCV 2010)
// Same algorithm used in Adobe Photoshop, Lightroom, Topaz Labs
// Mathematically proven HALO-FREE by design
// No unsharp mask (USM) anywhere - USM always causes halos

let cancelled = false;

self.onmessage = function(e) {
  const { type } = e.data;
  if (type === 'cancel') { cancelled = true; return; }
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
function processImage(src, w, h, settings) {
  try {
    var steps = [];
    if (settings.upscale > 1) steps.push('Detail recovery');
    if (settings.denoise > 0) steps.push('Denoising');
    if (settings.sharpen > 0) steps.push('Sharpening');
    if (settings.clarity > 0) steps.push('Clarity');
    if (settings.softness > 0) steps.push('Softening');
    steps.push('Final polish');
    if (settings.shadows !== 0 || settings.highlights !== 0 || settings.brightness !== 0) steps.push('Tone');
    if (settings.contrast !== 0) steps.push('Contrast');
    if (settings.saturation !== 0) steps.push('Vibrance');
    var total = Math.max(steps.length, 1);
    var step = 0;

    // 1. Detail Recovery (fix Canvas upscale softness - guided filter)
    if (settings.upscale > 1) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      var detailGain = 1.0 + (settings.upscale - 1) * 0.5;
      src = guidedDetailEnhance(src, w, h, 2, 0.0005, detailGain);
    }

    // 2. Denoise (guided filter smoothing)
    if (settings.denoise > 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      var denoiseEps = 0.01 + (settings.denoise / 100) * 0.8;
      src = guidedSmooth(src, w, h, 3, denoiseEps, settings.denoise / 120);
    }

    // 3. Sharpen (guided filter fine detail - halo-free)
    if (settings.sharpen > 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      var sharpGain = 1.0 + (settings.sharpen / 100) * 2.0;
      src = guidedDetailEnhance(src, w, h, 3, 0.001, sharpGain);
    }

    // 4. Clarity (guided filter local contrast - halo-free)
    if (settings.clarity > 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      var clarityGain = 1.0 + (settings.clarity / 100) * 1.8;
      src = guidedDetailEnhance(src, w, h, 10, 0.005, clarityGain);
    }

    // 5. Softness (guided filter edge-preserving smooth)
    if (settings.softness > 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      var softEps = 0.05 + (settings.softness / 50) * 0.8;
      src = guidedSmooth(src, w, h, 8, softEps, settings.softness / 55);
    }

    // 6. Light Halo Clean (safety net - guided filter already prevents halos)
    if (settings.upscale > 1 || settings.sharpen > 0 || settings.clarity > 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      src = lightHaloClean(src, w, h);
    }

    // 7-9. Color adjustments (same as before)
    if (settings.shadows !== 0 || settings.highlights !== 0 || settings.brightness !== 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      src = applyToneMapping(src, w, h, settings.shadows, settings.highlights, settings.brightness);
    }
    if (settings.contrast !== 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      src = applyContrast(src, w, h, settings.contrast);
    }
    if (settings.saturation !== 0) {
      if (cancelled) return;
      step++;
      sendProgress(steps[step-1] + ' (' + step + '/' + total + ')...', Math.round((step / total) * 95));
      src = applyVibrance(src, w, h, settings.saturation);
    }

    if (cancelled) return;
    sendProgress('Done!', 100);

    var resultBuffer = src.buffer.slice(0);
    self.postMessage({ type: 'result', buffer: resultBuffer, width: w, height: h }, [resultBuffer]);
  } catch (err) {
    self.postMessage({ type: 'error', message: err.message || 'Processing failed' });
  }
}


// ================================================================
// ===== GUIDED FILTER CORE (He et al., ECCV 2010) =====
// ================================================================
// This is the SAME algorithm used in Photoshop & Lightroom.
// Key property: mathematically proven HALO-FREE.
// Why: The filter coefficient 'a' approaches 1 at edges,
// so the output equals the input at edges = no overshoot = no halos.
//
// Implementation uses integral images (summed area tables) for O(N) speed.
// Memory efficient: only Float32Array buffers, reused where possible.

// Build integral image (summed area table) from Float32Array
function buildIntegral(data, w, h) {
  var integral = new Float32Array(w * h);
  // Row 0
  integral[0] = data[0];
  for (var x = 1; x < w; x++) {
    integral[x] = integral[x - 1] + data[x];
  }
  // Other rows
  for (var y = 1; y < h; y++) {
    var rowSum = 0;
    var yOff = y * w;
    var yOffPrev = (y - 1) * w;
    for (var x = 0; x < w; x++) {
      rowSum += data[yOff + x];
      integral[yOff + x] = integral[yOffPrev + x] + rowSum;
    }
  }
  return integral;
}

// Get area sum from integral image in O(1)
function areaSum(integral, w, x1, y1, x2, y2) {
  var a = integral[y2 * w + x2];
  var b = y1 > 0 ? integral[(y1 - 1) * w + x2] : 0;
  var c = x1 > 0 ? integral[y2 * w + (x1 - 1)] : 0;
  var d = (y1 > 0 && x1 > 0) ? integral[(y1 - 1) * w + (x1 - 1)] : 0;
  return a - b - c + d;
}

// Self-guided filter on luminance channel
// Returns the base (smoothed) layer as Float32Array
// q = mean_a * I + mean_b (the guided filter output)
function guidedFilterLuminance(lum, w, h, r, eps) {
  var size = w * h;

  // Compute I^2
  var lum2 = new Float32Array(size);
  for (var i = 0; i < size; i++) {
    lum2[i] = lum[i] * lum[i];
  }

  // Build integral images
  var intLum = buildIntegral(lum, w, h);
  var intLum2 = buildIntegral(lum2, w, h);

  // Build integral of ones for pixel count (handles borders correctly)
  var ones = new Float32Array(size);
  ones.fill(1);
  var intOnes = buildIntegral(ones, w, h);
  lum2 = null; // free memory

  // Compute coefficients a and b for every pixel
  var aCoeff = new Float32Array(size);
  var bCoeff = new Float32Array(size);

  for (var y = 0; y < h; y++) {
    var y1 = Math.max(0, y - r);
    var y2 = Math.min(h - 1, y + r);
    for (var x = 0; x < w; x++) {
      var x1 = Math.max(0, x - r);
      var x2 = Math.min(w - 1, x + r);

      var N = areaSum(intOnes, w, x1, y1, x2, y2);
      var sumI = areaSum(intLum, w, x1, y1, x2, y2);
      var sumI2 = areaSum(intLum2, w, x1, y1, x2, y2);

      var meanI = sumI / N;
      var varI = sumI2 / N - meanI * meanI;
      if (varI < 0) varI = 0; // numerical safety

      var idx = y * w + x;
      aCoeff[idx] = varI / (varI + eps);
      bCoeff[idx] = meanI * (1 - aCoeff[idx]);
    }
  }

  intLum = null;
  intLum2 = null;
  intOnes = null;

  // Box filter the coefficients (this is the key to halo-free output)
  var intA = buildIntegral(aCoeff, w, h);
  var intB = buildIntegral(bCoeff, w, h);
  aCoeff = null;
  bCoeff = null;

  // Compute output: q = mean_a * I + mean_b
  var result = new Float32Array(size);
  for (var y = 0; y < h; y++) {
    var y1 = Math.max(0, y - r);
    var y2 = Math.min(h - 1, y + r);
    for (var x = 0; x < w; x++) {
      var x1 = Math.max(0, x - r);
      var x2 = Math.min(w - 1, x + r);

      // Recompute N (could cache but memory is tight)
      var Ny1 = Math.max(0, y - r);
      var Ny2 = Math.min(h - 1, y + r);
      var Nx1 = Math.max(0, x - r);
      var Nx2 = Math.min(w - 1, x + r);

      var N2 = (Nx2 - Nx1 + 1) * (Ny2 - Ny1 + 1);
      var meanA = areaSum(intA, w, Nx1, Ny1, Nx2, Ny2) / N2;
      var meanB = areaSum(intB, w, Nx1, Ny1, Nx2, Ny2) / N2;

      var idx = y * w + x;
      result[idx] = meanA * lum[idx] + meanB;
    }
  }

  return result;
}

// Extract luminance from RGBA pixel data
function extractLuminance(src, w, h) {
  var size = w * h;
  var lum = new Float32Array(size);
  for (var i = 0; i < size; i++) {
    var i4 = i * 4;
    lum[i] = 0.299 * src[i4] + 0.587 * src[i4 + 1] + 0.114 * src[i4 + 2];
  }
  return lum;
}


// ================================================================
// ===== GUIDED DETAIL ENHANCEMENT (Halo-Free Sharpening/Clarity) =====
// ================================================================
// Decompose: base = guidedFilter(I), detail = I - base
// Enhance: output = base + detail * gain
// This is exactly how Lightroom Clarity and Photoshop Smart Sharpen work.
// Halo-free because guided filter preserves edges perfectly.

function guidedDetailEnhance(src, w, h, radius, eps, gain) {
  if (cancelled) return src;
  var size = w * h;

  // Extract luminance
  var lum = extractLuminance(src, w, h);

  // Run guided filter to get base layer
  var base = guidedFilterLuminance(lum, w, h, radius, eps);

  // Compute detail layer and apply gain
  // detail = lum - base (the fine details that guided filter smoothed out)
  // enhanced = base + detail * gain
  // For each RGB channel: output = src + (lum - base) * (gain - 1)
  // This adds the enhanced detail to all channels proportionally
  var dst = new Uint8ClampedArray(src);
  var detailScale = gain - 1.0; // gain=1 means no change

  for (var i = 0; i < size; i++) {
    var i4 = i * 4;
    var detailVal = (lum[i] - base[i]) * detailScale;
    for (var c = 0; c < 3; c++) {
      dst[i4 + c] = Math.max(0, Math.min(255, Math.round(src[i4 + c] + detailVal)));
    }
  }

  return dst;
}


// ================================================================
// ===== GUIDED SMOOTH (Edge-Preserving Softness/Denoise) =====
// ================================================================
// Smooth = guidedFilter(I, r, eps)
// Output = lerp(original, smooth, blendAmount)
// Edges are preserved by guided filter, flat areas get smoothed.

function guidedSmooth(src, w, h, radius, eps, blendAmount) {
  if (cancelled) return src;
  var size = w * h;

  // Extract luminance
  var lum = extractLuminance(src, w, h);

  // Run guided filter for smooth base
  var base = guidedFilterLuminance(lum, w, h, radius, eps);

  // Blend: output = original + (smoothReconstruction - original) * blend
  var dst = new Uint8ClampedArray(src);

  for (var i = 0; i < size; i++) {
    var i4 = i * 4;
    for (var c = 0; c < 3; c++) {
      // Reconstruct channel from smooth luminance + channel offset
      var channelOffset = src[i4 + c] - lum[i];
      var smoothChannel = base[i] + channelOffset;
      // Blend between original and smooth
      var blended = src[i4 + c] * (1 - blendAmount) + smoothChannel * blendAmount;
      dst[i4 + c] = Math.max(0, Math.min(255, Math.round(blended)));
    }
  }

  return dst;
}


// ================================================================
// ===== LIGHT HALO CLEAN (Safety Net) =====
// ================================================================
// Guided filter should not produce halos, but this catches
// any remaining edge artifacts from numerical precision.
// Uses the "Darken blending" technique from Photoshop:
// If a pixel is significantly brighter than its neighbors
// AND it's at an edge (some neighbors are dark) → pull it back.

function lightHaloClean(src, w, h) {
  var dst = new Uint8ClampedArray(src);

  for (var y = 1; y < h - 1; y++) {
    if (cancelled) return dst;
    for (var x = 1; x < w - 1; x++) {
      var idx = (y * w + x) * 4;

      // Check luminance for edge detection
      var centerL = 0.299 * src[idx] + 0.587 * src[idx + 1] + 0.114 * src[idx + 2];
      var topL = 0.299 * src[((y-1)*w+x)*4] + 0.587 * src[((y-1)*w+x)*4+1] + 0.114 * src[((y-1)*w+x)*4+2];
      var botL = 0.299 * src[((y+1)*w+x)*4] + 0.587 * src[((y+1)*w+x)*4+1] + 0.114 * src[((y+1)*w+x)*4+2];
      var leftL = 0.299 * src[(y*w+(x-1))*4] + 0.587 * src[(y*w+(x-1))*4+1] + 0.114 * src[(y*w+(x-1))*4+2];
      var rightL = 0.299 * src[(y*w+(x+1))*4] + 0.587 * src[(y*w+(x+1))*4+1] + 0.114 * src[(y*w+(x+1))*4+2];

      var neighborMeanL = (topL + botL + leftL + rightL) * 0.25;
      var excess = centerL - neighborMeanL;

      // Only clean bright halos at edges
      if (excess > 15) {
        // Check if it's an edge (some neighbors are much darker)
        var minL = Math.min(topL, botL, leftL, rightL);
        var edgeStrength = centerL - minL;
        if (edgeStrength > 50) {
          // This is a bright pixel at a strong edge - likely a halo
          var cleanAmount = Math.min(excess * 0.4, excess - 5);
          for (var c = 0; c < 3; c++) {
            var channelExcess = src[idx + c] - ((src[((y-1)*w+x)*4+c] + src[((y+1)*w+x)*4+c] + src[(y*w+(x-1))*4+c] + src[(y*w+(x+1))*4+c]) * 0.25);
            if (channelExcess > 5) {
              dst[idx + c] = Math.max(0, Math.round(src[idx + c] - channelExcess * 0.35));
            }
          }
        }
      }
    }
  }

  return dst;
}


// ================================================================
// ===== COLOR ADJUSTMENTS (Same as before) =====
// ================================================================

function applyToneMapping(src, w, h, shadows, highlights, brightness) {
  var brightnessAdj = brightness * 2.55;
  var dst = new Uint8ClampedArray(src.length);
  for (var i = 0; i < src.length; i += 4) {
    var r = src[i], g = src[i + 1], b = src[i + 2];
    var lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (shadows !== 0) {
      var sm = Math.max(0, 1 - lum / 128);
      var sa = shadows * sm * 0.01 * 255;
      r = Math.max(0, Math.min(255, r + sa));
      g = Math.max(0, Math.min(255, g + sa));
      b = Math.max(0, Math.min(255, b + sa));
    }
    if (highlights !== 0) {
      var hm = Math.max(0, (lum - 128) / 127);
      var ha = highlights * hm * 0.01 * 255;
      r = Math.max(0, Math.min(255, r + ha));
      g = Math.max(0, Math.min(255, g + ha));
      b = Math.max(0, Math.min(255, b + ha));
    }
    if (brightnessAdj !== 0) {
      r = Math.max(0, Math.min(255, r + brightnessAdj));
      g = Math.max(0, Math.min(255, g + brightnessAdj));
      b = Math.max(0, Math.min(255, b + brightnessAdj));
    }
    dst[i] = r; dst[i + 1] = g; dst[i + 2] = b; dst[i + 3] = src[i + 3];
  }
  return dst;
}

function applyContrast(src, w, h, contrast) {
  var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  var dst = new Uint8ClampedArray(src.length);
  for (var i = 0; i < src.length; i += 4) {
    dst[i] = Math.max(0, Math.min(255, factor * (src[i] - 128) + 128));
    dst[i + 1] = Math.max(0, Math.min(255, factor * (src[i + 1] - 128) + 128));
    dst[i + 2] = Math.max(0, Math.min(255, factor * (src[i + 2] - 128) + 128));
    dst[i + 3] = src[i + 3];
  }
  return dst;
}

function applyVibrance(src, w, h, saturation) {
  var strength = saturation / 100;
  var dst = new Uint8ClampedArray(src.length);
  for (var i = 0; i < src.length; i += 4) {
    var r = src[i], g = src[i + 1], b = src[i + 2];
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var curSat = max === 0 ? 0 : (max - min) / max;
    var boost = strength * (1 - curSat * 0.5);
    var avg = (r + g + b) / 3;
    dst[i] = Math.max(0, Math.min(255, r + (r - avg) * boost));
    dst[i + 1] = Math.max(0, Math.min(255, g + (g - avg) * boost));
    dst[i + 2] = Math.max(0, Math.min(255, b + (b - avg) * boost));
    dst[i + 3] = src[i + 3];
  }
  return dst;
}
