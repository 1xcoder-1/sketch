import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

const HEAD = "M92 200L78 70L172 126C215 109 249 109 292 126L386 70L372 200C424 258 424 310 386 344C324 420 272 424 232 424C192 424 140 420 78 344C40 310 40 258 92 200Z";
const PAW = "M340 410C330 392 336 370 354 356L390 326C404 314 424 326 424 344C424 354 420 360 412 366L392 384C406 392 414 408 406 420C396 434 354 428 340 410Z";

export const CatSticker: React.FC<StickerProps> = ({
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
  const shadow = `cat-shadow-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 464 464"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${id}-root ${className}`}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="cat Sticker"
      role="img"
      {...props}
    >
      <style>{`
        @keyframes ${id}-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-0.8deg); }
        }
        @keyframes ${id}-shine {
          0% { transform: translateX(-28px); opacity: 0; }
          30% { opacity: 0.95; }
          100% { transform: translateX(64px); opacity: 0; }
        }
        @keyframes ${id}-blink {
          0%, 93%, 100% { transform: scaleY(1); }
          97% { transform: scaleY(0.1); }
        }
        .${id}-whole { transform-origin: 232px 420px; }
        .${id}-eye { transform-origin: center; }
        @media (prefers-reduced-motion: no-preference) {
          .${id}-whole { animation: ${id}-bob 3.8s ease-in-out infinite; }
          .${id}-shine { animation: ${id}-shine 3.2s ease-in-out infinite; }
          .${id}-eye { animation: ${id}-blink 4.6s ease-in-out infinite; }
          .${id}-root:hover .${id}-whole { animation-duration: 1.6s; }
          .${id}-root:hover .${id}-shine { animation-duration: 1.2s; }
        }
      `}</style>

      <defs>
        <filter id={shadow} x="30" y="30" width="420" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#2A1E1A" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* flat tabby: die-cut border and artwork move as one */}
      <g className={`${id}-whole`}>
        <g filter={`url(#${shadow})`}>
          <path d={HEAD} fill="white" stroke="white" strokeWidth="26" strokeLinejoin="round" />
        </g>

        {/* ears */}
        <path d="M104 112L98 168L146 138Z" fill="#FF9FB8" stroke="#2A1E1A" strokeWidth="9" strokeLinejoin="round" />
        <path d="M360 112L366 168L318 138Z" fill="#FF9FB8" stroke="#2A1E1A" strokeWidth="9" strokeLinejoin="round" />

        {/* head */}
        <path d={HEAD} fill="#F6A23C" stroke="#2A1E1A" strokeWidth="16" strokeLinejoin="round" />

        {/* bold tabby stripes */}
        <g stroke="#C96A28" strokeWidth="9" strokeLinecap="round">
          <path d="M212 150L206 180M232 144L232 176M252 150L258 180" />
        </g>
        <path d="M120 200C128 174 144 158 164 150" stroke="white" strokeWidth="13" strokeLinecap="round" opacity="0.55" />

        {/* chunky shades */}
        <path d="M126 226C126 212 140 204 166 204C192 204 206 214 206 228C206 244 192 254 166 254C140 254 126 244 126 226Z" fill="#2B3A67" stroke="#2A1E1A" strokeWidth="11" strokeLinejoin="round" />
        <path d="M258 228C258 214 272 204 298 204C324 204 338 214 338 228C338 244 324 254 298 254C272 254 258 244 258 228Z" fill="#2B3A67" stroke="#2A1E1A" strokeWidth="11" strokeLinejoin="round" />
        <path d="M206 222C220 216 244 216 258 222" stroke="#2A1E1A" strokeWidth="12" strokeLinecap="round" />
        <g className={`${id}-shine`}>
          <path d="M142 220L156 210M274 222L288 212" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* cheeky muzzle + tongue */}
        <ellipse cx="150" cy="288" rx="20" ry="11" fill="#FF7A9C" />
        <ellipse cx="314" cy="288" rx="20" ry="11" fill="#FF7A9C" />
        <path d="M220 300L244 300L232 314Z" fill="#FF7A9C" />
        <path d="M232 314C232 330 254 336 266 322" stroke="#2A1E1A" strokeWidth="8" strokeLinecap="round" />
        <path d="M242 330C248 344 262 344 266 330Z" fill="#FF6E8A" />
        <g stroke="#FFF1D2" strokeWidth="5" strokeLinecap="round">
          <path d="M150 300L100 286M150 316L98 320M314 300L364 286M314 316L366 320" />
        </g>

        {/* waving paw, its border moves with it */}
        <g>
          <g filter={`url(#${shadow})`}>
            <path d={PAW} fill="white" stroke="white" strokeWidth="24" strokeLinejoin="round" />
          </g>
          <path d={PAW} fill="#F6A23C" stroke="#2A1E1A" strokeWidth="14" strokeLinejoin="round" />
          <g fill="#FF7A9C">
            <ellipse cx="372" cy="360" rx="7" ry="10" transform="rotate(-30 372 360)" />
            <ellipse cx="388" cy="350" rx="7" ry="10" transform="rotate(-15 388 350)" />
            <ellipse cx="402" cy="344" rx="7" ry="10" transform="rotate(5 402 344)" />
          </g>
        </g>
      </g>
    </svg>
  );
};
