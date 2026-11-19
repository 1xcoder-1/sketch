import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

const BRIM = "M38 285C38 250 90 228 160 220L420 220C490 228 540 250 540 285C540 335 470 372 289 372C108 372 38 335 38 285Z";
const CROWN = "M138 232C138 108 200 48 289 48C378 48 440 108 440 232Z";
const BAND = "M146 190C210 218 368 218 432 190L438 232C368 262 210 262 140 232Z";

export const LuffyHatSticker: React.FC<StickerProps> = ({
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
  const shadow = `hat-shadow-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 578 409"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${id}-root ${className}`}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Luffy Hat Sticker"
      role="img"
      {...props}
    >
      <style>{`
        @keyframes ${id}-tilt {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-4px); }
        }
        @keyframes ${id}-band {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        @keyframes ${id}-gleam {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        .${id}-hat { transform-origin: 289px 360px; }
        @media (prefers-reduced-motion: no-preference) {
          .${id}-hat { animation: ${id}-tilt 3.8s ease-in-out infinite; }
          .${id}-band { animation: ${id}-band 2.4s ease-in-out infinite; }
          .${id}-gleam { animation: ${id}-gleam 2.2s ease-in-out infinite; }
          .${id}-root:hover .${id}-hat { animation-duration: 1.5s; }
          .${id}-root:hover .${id}-band { animation-duration: 1s; }
        }
      `}</style>

      <defs>
        <filter id={shadow} x="10" y="20" width="560" height="390" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#2A1A24" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* flat straw hat: die-cut border and artwork move together */}
      <g className={`${id}-hat`}>
        <g filter={`url(#${shadow})`} fill="white" stroke="white" strokeWidth="20">
          <path d={CROWN} />
          <path d={BRIM} />
        </g>

        {/* brim + crown in solid flat colors */}
        <path d={BRIM} fill="#FFD25E" stroke="#2A1A24" strokeWidth="14" strokeLinejoin="round" />
        <path d={CROWN} fill="#FFD25E" stroke="#2A1A24" strokeWidth="14" strokeLinejoin="round" />

        {/* bold woven texture */}
        <g stroke="#C8872F" strokeWidth="9" strokeLinecap="round">
          <path d="M180 124L252 202M238 88L302 192M320 80L352 194M392 112L382 204" />
        </g>

        {/* crimson band */}
        <g className={`${id}-band`}>
          <path d={BAND} fill="#E4362F" stroke="#2A1A24" strokeWidth="12" strokeLinejoin="round" />
        </g>

        {/* stitched brim + soft highlight */}
        <path
          d="M82 296C122 336 202 350 289 350C376 350 456 336 496 296"
          stroke="#C8872F"
          strokeWidth="7"
          strokeDasharray="14 12"
          strokeLinecap="round"
        />
        <path className={`${id}-gleam`} d="M190 92C216 70 246 62 276 62" stroke="white" strokeWidth="15" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default LuffyHatSticker;
