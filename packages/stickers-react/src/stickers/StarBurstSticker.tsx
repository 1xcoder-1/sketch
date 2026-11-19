import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

function starPath(cx: number, cy: number, points: number, outer: number, inner: number): string {
  const parts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const x = (cx + Math.cos(angle) * radius).toFixed(1);
    const y = (cy + Math.sin(angle) * radius).toFixed(1);
    parts.push(`${i === 0 ? "M" : "L"}${x} ${y}`);
  }
  return `${parts.join(" ")}Z`;
}

export const StarBurstSticker: React.FC<StickerProps> = ({
  size = 120,
  width,
  height,
  peel = false,
  className = "",
  style,
  ...props
}) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "_");
  const shadow = `star-shadow-${id}`;
  const burst = `star-burst-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 725 637"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Star Burst Sticker"
      role="img"
      {...props}
    >
      <defs>
        <linearGradient id={burst} x1="180" y1="90" x2="540" y2="560" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B79BFF" />
          <stop offset="0.5" stopColor="#6C5CFF" />
          <stop offset="1" stopColor="#3346D8" />
        </linearGradient>
        <filter id={shadow} x="30" y="10" width="670" height="620" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="9" stdDeviation="11" floodColor="#1B1633" floodOpacity="0.24" />
        </filter>
      </defs>

      {/* die-cut border */}
      <g filter={`url(#${shadow})`}>
        <path d={starPath(362, 318, 8, 292, 150)} fill="white" stroke="white" strokeWidth="22" strokeLinejoin="round" />
      </g>

      {/* burst */}
      <path d={starPath(362, 318, 8, 262, 132)} fill={`url(#${burst})`} stroke="#1B1633" strokeWidth="16" strokeLinejoin="round" />

      {/* inner sparkle */}
      <path d={starPath(362, 318, 4, 132, 38)} fill="#FFF6D8" />
      <circle cx="362" cy="318" r="26" fill="#FFE45C" />

      {/* satellites */}
      <path d={starPath(112, 118, 4, 34, 10)} fill="#FFE45C" />
      <path d={starPath(618, 110, 4, 26, 8)} fill="#FF9FB6" />
      <path d={starPath(646, 508, 4, 20, 6)} fill="#FFE45C" />
    </svg>
  );
};

export default StarBurstSticker;
