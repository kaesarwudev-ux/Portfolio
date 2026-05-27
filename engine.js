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

function createDisplacementMapCanvas(width, height, surfaceType, bezelX, bezelY, ior, thickness) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(width, height);
  const surfaceFn = surfaces[surfaceType] || surfaces.convexCircle;
  const numSamples = 32;
  const profile = computeDisplacementProfile(surfaceFn, numSamples, ior, thickness);

  let maxDisp = 0;
  for (let i = 0; i < numSamples; i++) maxDisp = Math.max(maxDisp, Math.abs(profile[i]));
  if (maxDisp === 0) maxDisp = 1;

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const distTop = py;
      const distBottom = height - 1 - py;
      const distLeft = px;
      const distRight = width - 1 - px;
      const distV = Math.min(distTop, distBottom);
      const distH = Math.min(distLeft, distRight);

      let g = 128;
      let b = 128;

      if (distV < bezelY && bezelY > 0) {
        const t = distV / bezelY;
        const sampleIdx = Math.min(numSamples - 1, Math.floor(t * (numSamples - 1)));
        const magnitude = profile[sampleIdx] / maxDisp;
        const ny = (distTop <= distBottom) ? -1 : 1;
        g = Math.round(128 - ny * magnitude * 127);
      }

      if (distH < bezelX && bezelX > 0) {
        const t = distH / bezelX;
        const sampleIdx = Math.min(numSamples - 1, Math.floor(t * (numSamples - 1)));
        const magnitude = profile[sampleIdx] / maxDisp;
        const nx = (distLeft <= distRight) ? -1 : 1;
        b = Math.round(128 - nx * magnitude * 127);
      }

      const i = (py * width + px) * 4;
      imgData.data[i] = 128;
      imgData.data[i + 1] = Math.max(0, Math.min(255, g));
      imgData.data[i + 2] = Math.max(0, Math.min(255, b));
      imgData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}
