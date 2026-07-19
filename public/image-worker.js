// Image Enhancement Web Worker v5 - PROFESSIONAL HALO-FREE
// Zero white outlines around text. Professional grade.
// All sharpening uses brightness-aware halo suppression.
// Final Halo Clean pass removes any remaining edge artifacts.

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

function countSteps(s) {
  let n = 0;
  if (s.upscale > 1) n++;
  if (s.denoise > 0) n++;
  if (s.clarity > 0) n++;
  if (s.sharpen > 0) n++;
  if (s.shadows !== 0 || s.highlights !== 0 || s.brightness !== 0) n++;
  if (s.contrast !== 0) n++;
  if (s.saturation !== 0) n++;
  // Halo clean always runs when sharpening was applied
  if (s.upscale > 1 || s.sharpen > 0 || s.clarity > 0) n++;
  return Math.max(n, 1);
}

// ===== MAIN PROCESSING PIPELINE =====
function processImage(src, w, h, settings) {
  try {
    var totalSteps = countSteps(settings);
    var currentStep = 0;
    var hasAnySharpening = settings.upscale > 1 || settings.sharpen > 0 || settings.clarity > 0;

    // Step 1: Detail Recovery (halo-free) - fixes Canvas bicubic softness
    if (settings.upscale > 1) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Recovering detail (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
      src = applyDetailRecovery(src, w, h, settings.upscale);
    }

    // Step 2: Fast denoise (3x3 bilateral)
    if (settings.denoise > 0) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Denoising (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
      src = applyDenoise(src, w, h, settings.denoise);
    }

    // Step 3: Clarity (integral image, edge-aware)
    if (settings.clarity > 0) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Enhancing clarity (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
      src = applyClarity(src, w, h, settings.clarity);
    }

    // Step 4: Smart Sharpen (halo-free)
    if (settings.sharpen > 0) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Sharpening (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
      src = applySmartSharpen(src, w, h, settings.sharpen);
    }

    // Step 5: Halo Clean - removes any remaining white/dark outlines
    if (hasAnySharpening) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Cleaning edges (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
      src = applyHaloClean(src, w, h);
    }

    // Step 6-8: Color adjustments (only if user enabled)
    if (settings.shadows !== 0 || settings.highlights !== 0 || settings.brightness !== 0) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Tone mapping (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
      src = applyToneMapping(src, w, h, settings.shadows, settings.highlights, settings.brightness);
    }

    if (settings.contrast !== 0) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Contrast (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
      src = applyContrast(src, w, h, settings.contrast);
    }

    if (settings.saturation !== 0) {
      if (cancelled) return;
      currentStep++;
      sendProgress('Vibrance (' + currentStep + '/' + totalSteps + ')...', Math.round((currentStep / totalSteps) * 90));
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

// ===== HALO-FREE DETAIL RECOVERY =====
// Fixes Canvas bicubic softness WITHOUT creating white outlines
// Key: brightness-aware boost limiting prevents overshoot at edges
function applyDetailRecovery(src, w, h, scale) {
  var dst = new Uint8ClampedArray(src);
  var strength = 0.8 + (scale - 1) * 0.5;

  // Pass 1: Fine detail (3x3 neighborhood)
  var copy1 = new Uint8ClampedArray(src);
  for (var y = 1; y < h - 1; y++) {
    if (cancelled) return dst;
    for (var x = 1; x < w - 1; x++) {
      var idx = (y * w + x) * 4;
      for (var c = 0; c < 3; c++) {
        var center = copy1[idx + c];
        var top = copy1[((y - 1) * w + x) * 4 + c];
        var bottom = copy1[((y + 1) * w + x) * 4 + c];
        var left = copy1[(y * w + (x - 1)) * 4 + c];
        var right = copy1[(y * w + (x + 1)) * 4 + c];

        var blur = (top + bottom + left + right) * 0.25;
        var diff = center - blur;

        // Skip if no edge
        if (Math.abs(diff) < 2) continue;

        // ===== HALO PREVENTION =====
        var boost = diff * strength;

        // Limit boost based on local range and brightness
        var localMin = Math.min(center, top, bottom, left, right);
        var localMax = Math.max(center, top, bottom, left, right);
        var localRange = localMax - localMin;

        // Adaptive max boost: proportional to local range, prevents overshoot
        var maxBoost = Math.max(4, Math.min(50, localRange * 0.2));

        // Extra suppression for bright pixels getting brighter (white halo cause)
        if (diff > 0 && center > localMin + localRange * 0.6) {
          maxBoost *= 0.25; // Heavy suppression on bright side of edge
        }
        // Extra suppression for dark pixels getting darker
        if (diff < 0 && center < localMin + localRange * 0.4) {
          maxBoost *= 0.25;
        }

        // Apply boost with clamping
        var clampedBoost = Math.sign(diff) * Math.min(Math.abs(boost), maxBoost);
        dst[idx + c] = Math.max(0, Math.min(255, center + clampedBoost));
      }
    }
  }

  // Pass 2: Medium detail (5x5) for 3x+ upscale
  if (scale >= 3) {
    var copy2 = new Uint8ClampedArray(dst);
    var medStrength = strength * 0.3;

    for (var y2 = 2; y2 < h - 2; y2++) {
      if (cancelled) return dst;
      for (var x2 = 2; x2 < w - 2; x2++) {
        var idx2 = (y2 * w + x2) * 4;
        for (var c2 = 0; c2 < 3; c2++) {
          var center2 = copy2[idx2 + c2];
          var blur2 = 0;
          var min2 = 255, max2 = 0;
          for (var dy = -2; dy <= 2; dy++) {
            for (var dx = -2; dx <= 2; dx++) {
              var val = copy2[((y2 + dy) * w + (x2 + dx)) * 4 + c2];
              blur2 += val;
              if (val < min2) min2 = val;
              if (val > max2) max2 = val;
            }
          }
          blur2 /= 25;
          var diff2 = center2 - blur2;

          if (Math.abs(diff2) < 1) continue;

          var localRange2 = max2 - min2;
          var maxBoost2 = Math.max(3, Math.min(35, localRange2 * 0.15));

          // Halo prevention on bright side
          if (diff2 > 0 && center2 > min2 + localRange2 * 0.6) {
            maxBoost2 *= 0.2;
          }
          if (diff2 < 0 && center2 < min2 + localRange2 * 0.4) {
            maxBoost2 *= 0.2;
          }

          var boost2 = diff2 * medStrength;
          var clampedBoost2 = Math.sign(diff2) * Math.min(Math.abs(boost2), maxBoost2);
          dst[idx2 + c2] = Math.max(0, Math.min(255, center2 + clampedBoost2));
        }
      }
    }
  }

  return dst;
}

// ===== FAST DENOISE (3x3 bilateral) =====
function applyDenoise(src, w, h, strength) {
  var dst = new Uint8ClampedArray(src);
  var sigma = 15 + (100 - strength) * 0.8;
  var twoSigma2 = 2 * sigma * sigma;

  for (var y = 1; y < h - 1; y++) {
    if (cancelled) return dst;
    for (var x = 1; x < w - 1; x++) {
      var i = (y * w + x) * 4;
      for (var c = 0; c < 3; c++) {
        var center = src[i + c];
        var sum = center;
        var wSum = 1;
        var nIdxs = [
          ((y-1)*w+(x-1))*4+c, ((y-1)*w+x)*4+c, ((y-1)*w+(x+1))*4+c,
          (y*w+(x-1))*4+c,                         (y*w+(x+1))*4+c,
          ((y+1)*w+(x-1))*4+c, ((y+1)*w+x)*4+c, ((y+1)*w+(x+1))*4+c
        ];
        for (var n = 0; n < 8; n++) {
          var nVal = src[nIdxs[n]];
          var diff = nVal - center;
          var wt = Math.exp(-(diff * diff) / twoSigma2);
          sum += nVal * wt;
          wSum += wt;
        }
        dst[i + c] = Math.round(sum / wSum);
      }
    }
  }
  return dst;
}

// ===== CLARITY (Integral Image, edge-aware) =====
function applyClarity(src, w, h, amount) {
  var dst = new Uint8ClampedArray(src);
  var clarityStrength = amount / 100;
  var radius = 8;

  // Build integral images
  var integralR = new Float64Array(w * h);
  var integralG = new Float64Array(w * h);
  var integralB = new Float64Array(w * h);

  // Row 0
  integralR[0] = src[0]; integralG[0] = src[1]; integralB[0] = src[2];
  for (var x = 1; x < w; x++) {
    var i4 = x * 4;
    integralR[x] = integralR[x - 1] + src[i4];
    integralG[x] = integralG[x - 1] + src[i4 + 1];
    integralB[x] = integralB[x - 1] + src[i4 + 2];
  }

  // Remaining rows
  for (var y = 1; y < h; y++) {
    var rowR = 0, rowG = 0, rowB = 0;
    for (var x2 = 0; x2 < w; x2++) {
      var i4b = (y * w + x2) * 4;
      rowR += src[i4b]; rowG += src[i4b + 1]; rowB += src[i4b + 2];
      integralR[y * w + x2] = integralR[(y - 1) * w + x2] + rowR;
      integralG[y * w + x2] = integralG[(y - 1) * w + x2] + rowG;
      integralB[y * w + x2] = integralB[(y - 1) * w + x2] + rowB;
    }
  }

  // Apply clarity with halo awareness
  for (var y2 = 0; y2 < h; y2++) {
    if (cancelled) return dst;
    var y1min = Math.max(0, y2 - radius);
    var y1max = Math.min(h - 1, y2 + radius);
    for (var x3 = 0; x3 < w; x3++) {
      var x1min = Math.max(0, x3 - radius);
      var x1max = Math.min(w - 1, x3 + radius);
      var count = (x1max - x1min + 1) * (y1max - y1min + 1);

      var rMean = getArea(integralR, w, x1min, y1min, x1max, y1max) / count;
      var gMean = getArea(integralG, w, x1min, y1min, x1max, y1max) / count;
      var bMean = getArea(integralB, w, x1min, y1min, x1max, y1max) / count;

      var idx = (y2 * w + x3) * 4;

      // Compute local range for halo prevention
      // Use fast 3x3 min/max for edge detection
      if (y2 > 0 && y2 < h - 1 && x3 > 0 && x3 < w - 1) {
        var rLocal = [src[idx], src[((y2-1)*w+x3)*4], src[((y2+1)*w+x3)*4],
                      src[(y2*w+(x3-1))*4], src[(y2*w+(x3+1))*4]];
        var rMin = Math.min.apply(null, rLocal);
        var rMax = Math.max.apply(null, rLocal);
        var rRange = rMax - rMin;

        // At strong edges, reduce clarity to prevent halos
        var edgeSuppress = rRange > 80 ? 0.5 : 1.0;

        dst[idx] = Math.max(0, Math.min(255, src[idx] + (src[idx] - rMean) * clarityStrength * edgeSuppress));

        // Same for G and B channels - use simpler approach for speed
        var gLocal = [src[idx+1], src[((y2-1)*w+x3)*4+1], src[((y2+1)*w+x3)*4+1],
                      src[(y2*w+(x3-1))*4+1], src[(y2*w+(x3+1))*4+1]];
        var gMin = Math.min.apply(null, gLocal);
        var gMax = Math.max.apply(null, gLocal);
        var gEdgeSuppress = (gMax - gMin) > 80 ? 0.5 : 1.0;

        dst[idx + 1] = Math.max(0, Math.min(255, src[idx + 1] + (src[idx + 1] - gMean) * clarityStrength * gEdgeSuppress));

        var bLocal = [src[idx+2], src[((y2-1)*w+x3)*4+2], src[((y2+1)*w+x3)*4+2],
                      src[(y2*w+(x3-1))*4+2], src[(y2*w+(x3+1))*4+2]];
        var bMin = Math.min.apply(null, bLocal);
        var bMax = Math.max.apply(null, bLocal);
        var bEdgeSuppress = (bMax - bMin) > 80 ? 0.5 : 1.0;

        dst[idx + 2] = Math.max(0, Math.min(255, src[idx + 2] + (src[idx + 2] - bMean) * clarityStrength * bEdgeSuppress));
      } else {
        // Border pixels - no edge detection needed
        dst[idx] = Math.max(0, Math.min(255, src[idx] + (src[idx] - rMean) * clarityStrength));
        dst[idx + 1] = Math.max(0, Math.min(255, src[idx + 1] + (src[idx + 1] - gMean) * clarityStrength));
        dst[idx + 2] = Math.max(0, Math.min(255, src[idx + 2] + (src[idx + 2] - bMean) * clarityStrength));
      }
    }
  }

  return dst;
}

function getArea(integral, w, x1, y1, x2, y2) {
  var a = integral[y2 * w + x2];
  var b = y1 > 0 ? integral[(y1 - 1) * w + x2] : 0;
  var c = x1 > 0 ? integral[y2 * w + (x1 - 1)] : 0;
  var d = (y1 > 0 && x1 > 0) ? integral[(y1 - 1) * w + (x1 - 1)] : 0;
  return a - b - c + d;
}

// ===== SMART SHARPEN (Halo-Free) =====
// Replaces old USM. Uses brightness-aware adaptive clamping.
// Bright pixels at edges get limited positive boost (no white outlines).
// Dark pixels at edges get full negative boost (text becomes crisp).
function applySmartSharpen(src, w, h, amount) {
  var strength = amount / 100;
  var dst = new Uint8ClampedArray(src);

  // Pass 1: Fine detail (3x3)
  var copy1 = new Uint8ClampedArray(src);
  for (var y = 1; y < h - 1; y++) {
    if (cancelled) return dst;
    for (var x = 1; x < w - 1; x++) {
      var idx = (y * w + x) * 4;
      for (var c = 0; c < 3; c++) {
        var center = copy1[idx + c];
        var top = copy1[((y - 1) * w + x) * 4 + c];
        var bottom = copy1[((y + 1) * w + x) * 4 + c];
        var left = copy1[(y * w + (x - 1)) * 4 + c];
        var right = copy1[(y * w + (x + 1)) * 4 + c];

        var blur = (top + bottom + left + right) * 0.25;
        var diff = center - blur;

        if (Math.abs(diff) < 1) continue;

        // Local range for adaptive clamping
        var localMin = Math.min(center, top, bottom, left, right);
        var localMax = Math.max(center, top, bottom, left, right);
        var localRange = localMax - localMin;

        // Base max boost proportional to local range
        var maxBoost = Math.max(5, Math.min(55, localRange * 0.22));

        // ===== DIRECTIONAL HALO SUPPRESSION =====
        // If pixel is on the bright side of edge and boost would make it brighter:
        // This is the WHITE OUTLINE cause - suppress heavily
        if (diff > 0) {
          // How far is this pixel toward the bright end of the local range?
          var brightRatio = localRange > 0 ? (center - localMin) / localRange : 0.5;
          if (brightRatio > 0.5) {
            // Pixel is already on bright side - suppress to prevent halo
            maxBoost *= (1.0 - brightRatio) * 1.2;
            maxBoost = Math.max(maxBoost, 2); // Keep minimum for subtle detail
          }
        }
        // If pixel is on the dark side and boost would make it darker:
        // This is SAFE - makes text darker and crisper
        // No suppression needed

        var boost = diff * strength * 1.5;
        var clampedBoost = Math.sign(diff) * Math.min(Math.abs(boost), maxBoost);
        dst[idx + c] = Math.max(0, Math.min(255, center + clampedBoost));
      }
    }
  }

  // Pass 2: Medium detail (5x5) for stronger settings
  if (amount > 40) {
    var copy2 = new Uint8ClampedArray(dst);
    var medStr = strength * 0.35;

    for (var y2 = 2; y2 < h - 2; y2++) {
      if (cancelled) return dst;
      for (var x2 = 2; x2 < w - 2; x2++) {
        var idx2 = (y2 * w + x2) * 4;
        for (var c2 = 0; c2 < 3; c2++) {
          var center2 = copy2[idx2 + c2];
          var blur2 = 0, min2 = 255, max2 = 0;
          for (var dy = -2; dy <= 2; dy++) {
            for (var dx = -2; dx <= 2; dx++) {
              var val = copy2[((y2 + dy) * w + (x2 + dx)) * 4 + c2];
              blur2 += val;
              if (val < min2) min2 = val;
              if (val > max2) max2 = val;
            }
          }
          blur2 /= 25;
          var diff2 = center2 - blur2;

          if (Math.abs(diff2) < 1) continue;

          var localRange2 = max2 - min2;
          var maxBoost2 = Math.max(3, Math.min(40, localRange2 * 0.15));

          // Same directional halo suppression
          if (diff2 > 0) {
            var brightRatio2 = localRange2 > 0 ? (center2 - min2) / localRange2 : 0.5;
            if (brightRatio2 > 0.5) {
              maxBoost2 *= (1.0 - brightRatio2) * 1.2;
              maxBoost2 = Math.max(maxBoost2, 1);
            }
          }

          var boost2 = diff2 * medStr;
          var clampedBoost2 = Math.sign(diff2) * Math.min(Math.abs(boost2), maxBoost2);
          dst[idx2 + c2] = Math.max(0, Math.min(255, center2 + clampedBoost2));
        }
      }
    }
  }

  return dst;
}

// ===== HALO CLEAN - Final pass =====
// Detects and removes remaining white/dark outlines at text edges.
// A "halo pixel" is one that is significantly brighter than its neighbors
// while being at an edge boundary (some neighbors are much darker).
function applyHaloClean(src, w, h) {
  var dst = new Uint8ClampedArray(src);

  for (var y = 1; y < h - 1; y++) {
    if (cancelled) return dst;
    for (var x = 1; x < w - 1; x++) {
      var idx = (y * w + x) * 4;

      for (var c = 0; c < 3; c++) {
        var center = src[idx + c];

        // Get 3x3 neighborhood
        var top = src[((y - 1) * w + x) * 4 + c];
        var bottom = src[((y + 1) * w + x) * 4 + c];
        var left = src[(y * w + (x - 1)) * 4 + c];
        var right = src[(y * w + (x + 1)) * 4 + c];
        var tl = src[((y - 1) * w + (x - 1)) * 4 + c];
        var tr = src[((y - 1) * w + (x + 1)) * 4 + c];
        var bl = src[((y + 1) * w + (x - 1)) * 4 + c];
        var br = src[((y + 1) * w + (x + 1)) * 4 + c];

        var neighbors = [top, bottom, left, right, tl, tr, bl, br];
        var nMin = 255, nMax = 0, nSum = 0;
        for (var n = 0; n < 8; n++) {
          if (neighbors[n] < nMin) nMin = neighbors[n];
          if (neighbors[n] > nMax) nMax = neighbors[n];
          nSum += neighbors[n];
        }
        var nMean = nSum / 8;
        var nRange = nMax - nMin;

        // ===== BRIGHT HALO DETECTION =====
        // Center is significantly brighter than most neighbors AND
        // there's a big range (edge present) AND
        // center is on the bright side
        if (nRange > 50 && center > nMean + nRange * 0.15) {
          // Check: is at least one neighbor much darker?
          var darkCount = 0;
          for (var d = 0; d < 8; d++) {
            if (neighbors[d] < center - 40) darkCount++;
          }
          if (darkCount >= 1 && darkCount <= 5) {
            // This is likely a halo pixel (bright fringe at edge)
            // Pull it back toward the 4-connected mean (not diagonal)
            var crossMean = (top + bottom + left + right) / 4;
            // Blend: mostly keep original, but reduce the excess
            var excess = center - crossMean;
            if (excess > 0) {
              dst[idx + c] = Math.max(0, Math.min(255, Math.round(center - excess * 0.55)));
            }
          }
        }

        // ===== DARK HALO DETECTION =====
        // (Less common but can happen)
        if (nRange > 50 && center < nMean - nRange * 0.15) {
          var brightCount = 0;
          for (var b = 0; b < 8; b++) {
            if (neighbors[b] > center + 40) brightCount++;
          }
          if (brightCount >= 1 && brightCount <= 5) {
            var crossMean2 = (top + bottom + left + right) / 4;
            var deficit = crossMean2 - center;
            if (deficit > 0) {
              dst[idx + c] = Math.max(0, Math.min(255, Math.round(center + deficit * 0.55)));
            }
          }
        }
      }
    }
  }

  return dst;
}

// ===== TONE MAPPING =====
function applyToneMapping(src, w, h, shadows, highlights, brightness) {
  var dst = new Uint8ClampedArray(src.length);
  var brightnessAdj = brightness * 2.55;
  for (var i = 0; i < src.length; i += 4) {
    var r = src[i], g = src[i + 1], b = src[i + 2];
    var lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (shadows !== 0) {
      var shadowMask = Math.max(0, 1 - lum / 128);
      var shadowAdj = shadows * shadowMask * 0.01 * 255;
      r = Math.max(0, Math.min(255, r + shadowAdj));
      g = Math.max(0, Math.min(255, g + shadowAdj));
      b = Math.max(0, Math.min(255, b + shadowAdj));
    }
    if (highlights !== 0) {
      var hlMask = Math.max(0, (lum - 128) / 127);
      var hlAdj = highlights * hlMask * 0.01 * 255;
      r = Math.max(0, Math.min(255, r + hlAdj));
      g = Math.max(0, Math.min(255, g + hlAdj));
      b = Math.max(0, Math.min(255, b + hlAdj));
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

// ===== CONTRAST =====
function applyContrast(src, w, h, contrast) {
  var dst = new Uint8ClampedArray(src.length);
  var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for (var i = 0; i < src.length; i += 4) {
    dst[i] = Math.max(0, Math.min(255, factor * (src[i] - 128) + 128));
    dst[i + 1] = Math.max(0, Math.min(255, factor * (src[i + 1] - 128) + 128));
    dst[i + 2] = Math.max(0, Math.min(255, factor * (src[i + 2] - 128) + 128));
    dst[i + 3] = src[i + 3];
  }
  return dst;
}

// ===== VIBRANCE =====
function applyVibrance(src, w, h, saturation) {
  var dst = new Uint8ClampedArray(src.length);
  var strength = saturation / 100;
  for (var i = 0; i < src.length; i += 4) {
    var r = src[i], g = src[i + 1], b = src[i + 2];
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var currentSat = max === 0 ? 0 : (max - min) / max;
    var boost = strength * (1 - currentSat * 0.5);
    var avg = (r + g + b) / 3;
    dst[i] = Math.max(0, Math.min(255, r + (r - avg) * boost));
    dst[i + 1] = Math.max(0, Math.min(255, g + (g - avg) * boost));
    dst[i + 2] = Math.max(0, Math.min(255, b + (b - avg) * boost));
    dst[i + 3] = src[i + 3];
  }
  return dst;
}
