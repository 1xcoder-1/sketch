import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

const FLAME = "M42 101.136C33.25 72.3861 53.25 57.3861 73.25 71.1361L84.5 81.1361L77 46.1361C72 24.8861 89.5 16.1361 107 28.6361L127 49.8861L133.25 31.1361C139.5 9.88608 155.75 19.8861 169.5 38.6361C199.5 72.3861 223.25 111.136 225.75 147.386C229.5 203.636 192 241.136 137 248.636C88.25 254.886 54.5 229.886 39.5 192.386C29.5 169.886 22 141.136 22 116.136C22 98.6361 32 93.6361 42 101.136Z";
const CORE = "M104.5 111.136C108.25 98.6361 117 104.886 127 113.636C152 131.136 173.25 154.886 173.25 179.886C174.5 203.636 155.75 217.386 138.25 214.886C112 211.136 98.2499 184.886 99.4999 161.136C98.2499 142.386 99.4999 122.386 104.5 111.136Z";

export const FlameSticker: React.FC<StickerProps> = ({
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
  const shadow = `flame-shadow-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 248 275"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${id}-root ${className}`}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Flame Sticker"
      role="img"
      {...props}
    >
      <style>{`
        @keyframes ${id}-flicker {
          0%, 100% { transform: translateY(0) scale(1) skewX(0deg); }
          25% { transform: translateY(-2px) scale(1.03, 0.97) skewX(-2deg); }
          50% { transform: translateY(-1px) scale(0.97, 1.04) skewX(2deg); }
          75% { transform: translateY(-3px) scale(1.02, 0.99) skewX(-1deg); }
        }
        @keyframes ${id}-core {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(0.94, 1.06) translateY(3px); }
        }
        @keyframes ${id}-dot {
          0% { transform: translateY(6px) scale(0.6); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateY(-20px) scale(1.1); opacity: 0; }
        }
        @keyframes ${id}-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
        .${id}-body { transform-origin: 124px 250px; }
        .${id}-core { transform-origin: 136px 200px; }
        .${id}-eye { transform-origin: center; }
        @media (prefers-reduced-motion: no-preference) {
          .${id}-body { animation: ${id}-flicker 2.2s ease-in-out infinite; }
          .${id}-core { animation: ${id}-core 1.4s ease-in-out infinite; }
          .${id}-dot { animation: ${id}-dot 2s ease-out infinite; }
          .${id}-eye { animation: ${id}-blink 4.5s ease-in-out infinite; }
          .${id}-root:hover .${id}-body { animation-duration: 1s; }
          .${id}-root:hover .${id}-core { animation-duration: 0.7s; }
          .${id}-root:hover .${id}-dot { animation-duration: 1.1s; }
        }
      `}</style>

      <defs>
        <filter id={shadow} x="0" y="0" width="248" height="275" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#2A1630" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* flat flame: die-cut border and artwork move as one */}
      <g className={`${id}-body`}>
        <g filter={`url(#${shadow})`}>
          <path d={FLAME} fill="white" stroke="white" strokeWidth="24" strokeLinejoin="round" />
        </g>
        <path d={FLAME} fill="#FF6B2C" stroke="#2A1630" strokeWidth="11" strokeLinejoin="round" />
        <path d="M60 118C58 136 62 152 70 166" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.5" />

        <g className={`${id}-core`}>
          <path d={CORE} fill="#FFD23F" stroke="#2A1630" strokeWidth="7" strokeLinejoin="round" />
          <path d="M112 132C118 122 126 120 132 124" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.8" />

          {/* cheeky fire face */}
          <g className={`${id}-eye`}>
            <ellipse cx="123" cy="158" rx="7" ry="11" fill="#2A1630" />
            <ellipse cx="149" cy="158" rx="7" ry="11" fill="#2A1630" />
          </g>
          <circle cx="126" cy="154" r="2.4" fill="white" />
          <circle cx="152" cy="154" r="2.4" fill="white" />
          <path d="M126 180Q136 190 146 180" stroke="#2A1630" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="108" cy="176" rx="8" ry="5" fill="#FF5C7A" opacity="0.6" />
          <ellipse cx="165" cy="176" rx="8" ry="5" fill="#FF5C7A" opacity="0.6" />
        </g>
      </g>

      {/* rising dots — no stars */}
      <g fill="#FFD23F">
        <circle className={`${id}-dot`} cx="40" cy="76" r="5" style={{ animationDelay: "0s" }} />
        <circle className={`${id}-dot`} cx="202" cy="62" r="6" style={{ animationDelay: "0.6s" }} />
        <circle className={`${id}-dot`} cx="226" cy="128" r="4" style={{ animationDelay: "1.2s" }} />
        <circle className={`${id}-dot`} cx="32" cy="154" r="4" style={{ animationDelay: "1.7s" }} />
      </g>
    </svg>
  );
};

export default FlameSticker;
