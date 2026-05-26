const surfaces = {
  convexSquircle(x) {
    return Math.pow(1 - Math.pow(1 - x, 4), 0.25);
  },
  convexCircle(x) {
    return Math.sqrt(1 - (1 - x) * (1 - x));
  },
  lip(x) {
    const convex = Math.pow(1 - Math.pow(1 - x, 4), 0.25);
    const concave = 1 - convex;
    const t = x * x * x * (x * (x * 6 - 15) + 10);
    return convex * (1 - t) + concave * t;
  },
};

function computeDisplacementProfile(surfaceFn, numSamples, ior, thickness) {
  const displacements = new Float64Array(numSamples);
  const delta = 0.001;
  for (let i = 0; i < numSamples; i++) {
    const x = i / (numSamples - 1);
    const y1 = surfaceFn(Math.max(0, x - delta));
    const y2 = surfaceFn(Math.min(1, x + delta));
    const derivative = (y2 - y1) / (2 * delta);
    const incidenceAngle = Math.atan(Math.abs(derivative));
    const sinRefracted = Math.sin(incidenceAngle) / ior;
    if (Math.abs(sinRefracted) >= 1) {
      displacements[i] = 0;
      continue;
    }
    const refractionAngle = Math.asin(sinRefracted);
    const displacement = thickness * (Math.tan(incidenceAngle) - Math.tan(refractionAngle)) * Math.sign(derivative);
    displacements[i] = displacement;
  }
  return displacements;
}

function createDisplacementMapImage(width, height, surfaceType, bezelWidth, ior, thickness) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(width, height);
  const surfaceFn = surfaces[surfaceType] || surfaces.convexSquircle;
  const numSamples = 128;
  const profile = computeDisplacementProfile(surfaceFn, numSamples, ior, thickness);

  let maxDisp = 0;
  for (let i = 0; i < numSamples; i++) maxDisp = Math.max(maxDisp, Math.abs(profile[i]));
  if (maxDisp === 0) maxDisp = 1;

  const bezelPx = Math.min(width, height) * bezelWidth;

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      // Distance from Top/Bottom and Left/Right edges
      const distTop = py;
      const distBottom = height - 0 - py;
      const distFromVerticalBorder = Math.min(distTop, distBottom);

      let r = 128;
      let g = 128;
      let b = 128;

      if (distFromVerticalBorder < bezelPx && bezelPx > 0) {
        const t = distFromVerticalBorder / bezelPx;
        const sampleIdx = Math.min(numSamples - 1, Math.floor(t * (numSamples - 1)));
        const magnitude = profile[sampleIdx] / maxDisp;

        const ny = (distTop <= distBottom) ? -1 : 1;
        g = Math.round(128 - ny * magnitude * 127);
      }

      const i = (py * width + px) * 4;
      imgData.data[i] = Math.max(0, Math.min(255, r));
      imgData.data[i + 1] = Math.max(0, Math.min(255, g));
      imgData.data[i + 2] = Math.max(0, Math.min(255, b));
      imgData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return { dataUrl: canvas.toDataURL('image/png', 1.0), maxDisplacement: maxDisp };
}
