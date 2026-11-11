export function getCoverCrop(imageWidth: number, imageHeight: number, width: number, height: number) {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const cropWidth = width / scale;
  const cropHeight = height / scale;
  return { x: (imageWidth - cropWidth) / 2, y: (imageHeight - cropHeight) / 2, width: cropWidth, height: cropHeight };
}

export function getLensCrop(rect: { x: number; y: number; width: number; height: number }, strength: number) {
  const insetX = rect.width * strength / 2;
  const insetY = rect.height * strength / 2;
  return {
    x: rect.x + insetX,
    y: rect.y + insetY,
    width: Math.max(1, rect.width - insetX * 2),
    height: Math.max(1, rect.height - insetY * 2),
  };
}

export function getLensInfluence(x: number, y: number, pointerX: number, pointerY: number, radius: number) {
  if (radius <= 0) return 0;
  return Math.max(0, 1 - Math.hypot(x - pointerX, y - pointerY) / radius);
}

export function damp(current: number, target: number, factor: number, frames: number) {
  return current + (target - current) * (1 - Math.pow(1 - factor, frames));
}
