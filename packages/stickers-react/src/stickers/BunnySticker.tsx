import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

const EAR_L = "M300 290C262 180 252 96 292 78C336 58 352 160 352 268Z";
const EAR_R = "M462 290C500 180 510 96 470 78C426 58 410 160 410 268Z";
const HEAD = "M380 258C470 258 520 310 520 378C520 446 470 492 380 492C290 492 240 446 240 378C240 310 290 258 380 258Z";
const BODY = "M380 452C485 452 555 525 555 615C555 690 480 720 380 720C280 720 205 690 205 615C205 525 275 452 380 452Z";

export const BunnySticker: React.FC<StickerProps> = ({
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
  const shadow = `bunny-shadow-${id}`;
  const fur = `bunny-fur-${id}`;
  const carrot = `bunny-carrot-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 762 753"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${id}-root ${className}`}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Bunny Sticker"
      role="img"
      {...props}
    >
      <style>{`
        @keyframes ${id}-earL {
          0%, 84%, 100% { transform: rotate(0deg); }
          90% { transform: rotate(9deg); }
          96% { transform: rotate(-4deg); }
        }
        @keyframes ${id}-earR {
          0%, 84%, 100% { transform: rotate(0deg); }
          90% { transform: rotate(-9deg); }
          96% { transform: rotate(4deg); }
        }
        @keyframes ${id}-nose {
          0%, 88%, 100% { transform: scale(1); }
          92% { transform: scale(1.3, 0.8); }
          96% { transform: scale(0.9, 1.15); }
        }
        @keyframes ${id}-hop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes ${id}-float {
          0%, 100% { transform: translateY(0) opacity: 0.7; }
          50% { transform: translateY(-12px) opacity: 1; }
        }
        .${id}-earL { transform-origin: 320px 286px; animation: ${id}-earL 4.6s ease-in-out infinite; }
        .${id}-earR { transform-origin: 442px 286px; animation: ${id}-earR 5.1s ease-in-out infinite; }
        .${id}-nose { transform-origin: 380px 400px; animation: ${id}-nose 3.2s ease-in-out infinite; }
        .${id}-whole { transform-origin: 380px 700px; animation: ${id}-hop 3.8s ease-in-out infinite; }
        .${id}-float { animation: ${id}-float 2.8s ease-in-out infinite; }
        .${id}-root:hover .${id}-whole { animation-duration: 1.1s; }
        .${id}-root:hover .${id}-earL,
        .${id}-root:hover .${id}-earR { animation-duration: 1.6s; }
        @media (prefers-reduced-motion: reduce) {
          .${id}-root * { animation: none !important; }
        }
      `}</style>

      <defs>
        <linearGradient id={fur} x1="250" y1="90" x2="520" y2="700" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E3DBFF" />
        </linearGradient>
        <linearGradient id={carrot} x1="360" y1="600" x2="404" y2="690" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB24A" />
          <stop offset="1" stopColor="#F07024" />
        </linearGradient>
        <filter id={shadow} x="170" y="45" width="460" height="700" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="9" stdDeviation="11" floodColor="#2A1A44" floodOpacity="0.24" />
        </filter>
      </defs>

      {/* die-cut border */}
      <g filter={`url(#${shadow})`} fill="white" stroke="white" strokeWidth="34" strokeLinejoin="round">
        <path d={EAR_L} />
        <path d={EAR_R} />
        <circle cx="572" cy="640" r="28" />
        <path d={BODY} />
        <path d={HEAD} />
      </g>

      <g className={`${id}-whole`}>
        {/* tail */}
        <circle cx="572" cy="640" r="28" fill={`url(#${fur})`} stroke="#2A1A44" strokeWidth="12" />

        {/* ears */}
        <g className={`${id}-earL`}>
          <path d={EAR_L} fill={`url(#${fur})`} stroke="#2A1A44" strokeWidth="14" strokeLinejoin="round" />
          <path d="M305 130C292 158 292 214 302 254L334 246C330 190 330 142 320 118Z" fill="#FFB3C7" />
        </g>
        <g className={`${id}-earR`}>
          <path d={EAR_R} fill={`url(#${fur})`} stroke="#2A1A44" strokeWidth="14" strokeLinejoin="round" />
          <path d="M457 130C470 158 470 214 460 254L428 246C432 190 432 142 442 118Z" fill="#FFB3C7" />
        </g>

        {/* body */}
        <path d={BODY} fill={`url(#${fur})`} stroke="#2A1A44" strokeWidth="14" strokeLinejoin="round" />
        <path d="M270 540C252 580 250 626 262 660" stroke="white" strokeOpacity="0.8" strokeWidth="12" strokeLinecap="round" />

        {/* head */}
        <path d={HEAD} fill={`url(#${fur})`} stroke="#2A1A44" strokeWidth="14" strokeLinejoin="round" />

        {/* face */}
        <ellipse cx="330" cy="375" rx="10" ry="15" fill="#2A1A44" />
        <ellipse cx="430" cy="375" rx="10" ry="15" fill="#2A1A44" />
        <circle cx="333" cy="370" r="3" fill="white" />
        <circle cx="433" cy="370" r="3" fill="white" />
        <ellipse cx="292" cy="414" rx="24" ry="12" fill="#FFA8C0" opacity="0.65" />
        <ellipse cx="468" cy="414" rx="24" ry="12" fill="#FFA8C0" opacity="0.65" />
        <g className={`${id}-nose`}>
          <path d="M370 400C370 390 390 390 390 400C390 410 370 410 370 400Z" fill="#FF6E8A" stroke="#2A1A44" strokeWidth="4" />
        </g>
        <path d="M380 410C380 428 362 434 352 424M380 410C380 428 398 434 408 424" stroke="#2A1A44" strokeWidth="7" strokeLinecap="round" />
        <path d="M372 428H388V442C388 448 372 448 372 442Z" fill="white" stroke="#2A1A44" strokeWidth="4" strokeLinejoin="round" />

        {/* carrot */}
        <g style={{ transformOrigin: "380px 600px" }}>
          <path d="M380 596C400 596 410 608 404 628L390 684C386 700 374 700 370 684L356 628C350 608 360 596 380 596Z" fill={`url(#${carrot})`} stroke="#2A1A44" strokeWidth="10" strokeLinejoin="round" />
          <g stroke="#37B86A" strokeWidth="10" strokeLinecap="round" fill="none">
            <path d="M380 598C372 580 356 570 344 568C356 584 360 592 366 600" />
            <path d="M380 598C388 580 404 570 416 568C404 584 400 592 394 600" />
            <path d="M380 598C380 578 380 566 380 556" />
          </g>
          <g stroke="white" strokeOpacity="0.55" strokeWidth="6" strokeLinecap="round">
            <path d="M366 626L374 632M394 624L386 632M378 652L384 658" />
          </g>
        </g>

        {/* paws */}
        <ellipse cx="318" cy="662" rx="34" ry="22" fill={`url(#${fur})`} stroke="#2A1A44" strokeWidth="11" />
        <ellipse cx="442" cy="662" rx="34" ry="22" fill={`url(#${fur})`} stroke="#2A1A44" strokeWidth="11" />
      </g>

      {/* sparkles */}
      <g className={`${id}-float`} fill="#FFE45C" stroke="#2A1A44" strokeWidth="5" strokeLinejoin="round">
        <path d="M210 130L217 148L235 155L217 162L210 180L203 162L185 155L203 148L210 130Z" />
      </g>
      <g className={`${id}-float`} style={{ animationDelay: "1.2s" }} fill="#FF9FB8" stroke="#2A1A44" strokeWidth="4" strokeLinejoin="round">
        <path d="M552 180L558 194L572 200L558 206L552 220L546 206L532 200L546 194L552 180Z" />
      </g>
    </svg>
  );
};

export default BunnySticker;
