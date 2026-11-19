import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const FaceSticker: React.FC<StickerProps> = ({
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
  const shadow = `face-shadow-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 883 825"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${id}-root ${className}`}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="face Sticker"
      role="img"
      {...props}
    >
      <style>{`
        @keyframes ${id}-bob {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50% { transform: translateY(-7px) rotate(1.5deg); }
        }
        @keyframes ${id}-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.08); }
        }
        @keyframes ${id}-brow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .${id}-whole { transform-origin: 441px 730px; }
        .${id}-eyes { transform-origin: 441px 356px; }
        @media (prefers-reduced-motion: no-preference) {
          .${id}-whole { animation: ${id}-bob 3.6s ease-in-out infinite; }
          .${id}-eyes { animation: ${id}-blink 4.4s ease-in-out infinite; }
          .${id}-brow { animation: ${id}-brow 2.8s ease-in-out infinite; }
          .${id}-root:hover .${id}-whole { animation-duration: 1.5s; }
          .${id}-root:hover .${id}-brow { animation-duration: 1.1s; }
        }
      `}</style>

      <defs>
        <filter id={shadow} x="50" y="30" width="790" height="780" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#241A2E" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* flat cartoon face: die-cut border and artwork move together */}
      <g className={`${id}-whole`}>
        <g transform="rotate(-6 441 412)">
          <g filter={`url(#${shadow})`}>
            <circle cx="441" cy="412" r="352" fill="white" stroke="white" strokeWidth="30" />
          </g>
          <circle cx="441" cy="412" r="322" fill="#FFC531" stroke="#241A2E" strokeWidth="24" />

          {/* chunky hair tuft */}
          <path
            d="M286 150C300 96 336 62 386 58C398 106 424 122 470 112C486 152 520 174 566 172C546 122 566 84 606 70C640 128 640 190 612 232C536 172 380 168 286 150Z"
            fill="#FF6B35"
            stroke="#241A2E"
            strokeWidth="20"
            strokeLinejoin="round"
          />

          {/* raised eyebrow + flat eyebrow */}
          <path className={`${id}-brow`} d="M292 292C330 262 374 264 398 284" stroke="#241A2E" strokeWidth="22" strokeLinecap="round" />
          <path d="M498 280C536 262 578 268 596 292" stroke="#241A2E" strokeWidth="22" strokeLinecap="round" />

          {/* quirky eyes */}
          <g className={`${id}-eyes`}>
            <ellipse cx="340" cy="360" rx="34" ry="46" fill="#241A2E" />
            <ellipse cx="548" cy="356" rx="34" ry="46" fill="#241A2E" />
            <circle cx="352" cy="344" r="11" fill="white" />
            <circle cx="560" cy="340" r="11" fill="white" />
          </g>

          {/* flat blush */}
          <ellipse cx="268" cy="452" rx="58" ry="28" fill="#FF7A9C" />
          <ellipse cx="614" cy="446" rx="58" ry="28" fill="#FF7A9C" />

          {/* cheeky open smirk */}
          <path
            d="M322 512C390 604 506 604 580 500C562 620 384 646 322 512Z"
            fill="#241A2E"
            stroke="#241A2E"
            strokeWidth="14"
            strokeLinejoin="round"
          />
          <path d="M420 590C452 568 494 570 514 592C490 618 444 616 420 590Z" fill="#FF6E8A" />
          <path d="M330 508C332 498 338 494 348 496" stroke="#241A2E" strokeWidth="14" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};
