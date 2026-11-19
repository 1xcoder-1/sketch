import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

const HAND = "M118.14 193.203L33.1403 129.453C9.39031 114.453 14.3903 90.7034 30.6403 84.4534C43.1403 78.2034 51.8903 84.4534 64.3903 93.2034L134.39 140.703L109.39 56.9534C100.64 33.2034 109.39 16.9534 124.39 16.9534C141.89 15.7034 149.39 29.4534 154.39 49.4534L176.89 111.953C191.89 98.2034 209.39 101.953 215.64 116.953C234.39 104.453 249.39 114.453 254.39 133.203L269.39 193.203C281.89 244.453 248.14 280.703 201.89 283.203C156.89 285.703 124.39 260.703 118.14 225.703V193.203Z";

export const PeaceHandSticker: React.FC<StickerProps> = ({
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
  const shadow = `peace-shadow-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 289 301"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${id}-root ${className}`}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="peace-hand Sticker"
      role="img"
      {...props}
    >
      <style>{`
        @keyframes ${id}-rock {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes ${id}-float {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-8px) rotate(4deg); }
        }
        @keyframes ${id}-blink {
          0%, 93%, 100% { transform: scaleY(1); }
          97% { transform: scaleY(0.1); }
        }
        .${id}-hand { transform-origin: 170px 280px; }
        .${id}-heart { transform-origin: 248px 62px; }
        .${id}-eye { transform-origin: center; }
        @media (prefers-reduced-motion: no-preference) {
          .${id}-hand { animation: ${id}-rock 3.4s ease-in-out infinite; }
          .${id}-heart { animation: ${id}-float 2.6s ease-in-out infinite; }
          .${id}-eye { animation: ${id}-blink 4.2s ease-in-out infinite; }
          .${id}-root:hover .${id}-hand { animation-duration: 1.2s; }
          .${id}-root:hover .${id}-heart { animation-duration: 1s; }
        }
      `}</style>

      <defs>
        <filter id={shadow} x="0" y="0" width="289" height="301" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#241A2E" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* floating heart — no stars */}
      <g className={`${id}-heart`}>
        <path d="M248 54C242 46 230 48 230 58C230 66 242 72 248 78C254 72 266 66 266 58C266 48 254 46 248 54Z" fill="#FF5C7A" stroke="#241A2E" strokeWidth="6" strokeLinejoin="round" />
      </g>

      {/* flat hand: die-cut border and artwork move as one */}
      <g className={`${id}-hand`}>
        <g filter={`url(#${shadow})`}>
          <path d={HAND} fill="white" stroke="white" strokeWidth="44" strokeLinejoin="round" />
        </g>
        <path d={HAND} fill="#FFC9A3" stroke="#241A2E" strokeWidth="16" strokeLinejoin="round" />

        {/* finger creases */}
        <g stroke="#241A2E" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
          <path d="M134.39 140.703L151.89 161.953M176.89 111.953L188.14 145.703" />
          <path d="M215.64 116.953L226.89 160.703C229.39 176.953 219.39 184.453 205.64 176.953L193.14 165.703" />
          <path d="M254.39 134.453L263.14 170.703C266.89 188.203 250.64 196.953 236.89 188.203L224.39 176.953" />
        </g>

        {/* palm line */}
        <path
          d="M121.89 208.203C114.39 191.953 128.14 178.203 145.64 169.453L169.39 156.953C186.89 148.203 203.14 155.703 200.64 171.953C199.39 188.203 180.64 198.203 164.39 203.203C179.39 208.203 186.89 218.203 188.14 230.703"
          fill="none"
          stroke="#241A2E"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* little face on the palm */}
        <g className={`${id}-eye`}>
          <ellipse cx="152" cy="222" rx="6" ry="8" fill="#241A2E" />
          <ellipse cx="180" cy="222" rx="6" ry="8" fill="#241A2E" />
        </g>
        <path d="M156 240Q166 248 176 240" stroke="#241A2E" strokeWidth="5" strokeLinecap="round" />

        {/* flat teal wristband */}
        <path d="M126 244C160 268 214 272 252 250" stroke="#241A2E" strokeWidth="26" strokeLinecap="round" />
        <path d="M126 244C160 268 214 272 252 250" stroke="#17B89B" strokeWidth="16" strokeLinecap="round" />
      </g>
    </svg>
  );
};
