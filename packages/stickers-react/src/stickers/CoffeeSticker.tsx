import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

const BODY = "M118 170H338L316 350C312 380 286 398 228 398C170 398 144 380 140 350Z";
const HANDLE = "M336 214C406 204 414 306 324 304";

export const CoffeeSticker: React.FC<StickerProps> = ({
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
  const shadow = `coffee-shadow-${id}`;

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
      aria-label="Coffee Sticker"
      role="img"
      {...props}
    >
      <style>{`
        @keyframes ${id}-steam {
          0% { transform: translateY(10px) scale(0.9); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translateY(-22px) scale(1.1); opacity: 0; }
        }
        @keyframes ${id}-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes ${id}-blink {
          0%, 93%, 100% { transform: scaleY(1); }
          97% { transform: scaleY(0.1); }
        }
        .${id}-mug { transform-origin: 228px 398px; }
        .${id}-eye { transform-origin: center; }
        @media (prefers-reduced-motion: no-preference) {
          .${id}-mug { animation: ${id}-bob 2.6s ease-in-out infinite; }
          .${id}-steam { animation: ${id}-steam 2.4s ease-out infinite; }
          .${id}-eye { animation: ${id}-blink 5s ease-in-out infinite; }
          .${id}-root:hover .${id}-mug { animation-duration: 1.1s; }
          .${id}-root:hover .${id}-steam { animation-duration: 1.2s; }
        }
      `}</style>

      <defs>
        <filter id={shadow} x="60" y="20" width="380" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#303230" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* rising steam — no stars */}
      <g stroke="#303230" strokeWidth="10" strokeLinecap="round" fill="none">
        <path className={`${id}-steam`} d="M190 132C174 112 206 100 190 76C180 62 192 52 196 48" style={{ animationDelay: "0s" }} />
        <path className={`${id}-steam`} d="M228 128C212 108 244 96 228 72C218 58 230 48 234 44" style={{ animationDelay: "0.6s" }} />
        <path className={`${id}-steam`} d="M266 134C250 114 282 102 266 78C256 64 268 54 272 50" style={{ animationDelay: "1.2s" }} />
      </g>

      {/* flat mug: die-cut border and artwork move as one */}
      <g className={`${id}-mug`}>
        <g filter={`url(#${shadow})`} fill="none" stroke="white" strokeWidth="40" strokeLinecap="round">
          <path d={HANDLE} />
          <path d={BODY} fill="white" strokeLinejoin="round" />
          <ellipse cx="228" cy="170" rx="110" ry="30" fill="white" />
        </g>

        {/* handle */}
        <path d={HANDLE} stroke="#303230" strokeWidth="32" strokeLinecap="round" />
        <path d={HANDLE} stroke="#E4492F" strokeWidth="16" strokeLinecap="round" />

        {/* cup */}
        <path d={BODY} fill="#E4492F" stroke="#303230" strokeWidth="16" strokeLinejoin="round" />
        <path d="M126 196C178 210 278 210 330 196L326 218C276 232 180 232 130 218Z" fill="#FFF2D6" />
        <path d="M152 300C156 340 172 364 192 376" stroke="#FF9B84" strokeWidth="12" strokeLinecap="round" />

        {/* cheeky face */}
        <g className={`${id}-eye`}>
          <ellipse cx="194" cy="262" rx="9" ry="13" fill="#303230" />
          <ellipse cx="262" cy="262" rx="9" ry="13" fill="#303230" />
        </g>
        <circle cx="197" cy="258" r="3" fill="white" />
        <circle cx="265" cy="258" r="3" fill="white" />
        <ellipse cx="166" cy="284" rx="18" ry="10" fill="#FF8FA0" />
        <ellipse cx="290" cy="284" rx="18" ry="10" fill="#FF8FA0" />
        <path d="M208 292Q228 310 248 292" stroke="#303230" strokeWidth="7" strokeLinecap="round" />

        {/* rim + coffee + latte heart */}
        <ellipse cx="228" cy="170" rx="110" ry="30" fill="#FFF7E6" stroke="#303230" strokeWidth="16" />
        <ellipse cx="228" cy="172" rx="94" ry="20" fill="#5A3626" />
        <path d="M228 184C220 176 208 174 208 166C208 160 216 158 228 166C240 158 248 160 248 166C248 174 236 176 228 184Z" fill="#FFF2D6" />
      </g>
    </svg>
  );
};

export default CoffeeSticker;
