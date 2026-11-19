"use client";

import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export type StickerMotion = "bob" | "tilt" | "wave" | "float" | "sway" | "pulse";

const KEYFRAMES: Record<StickerMotion, string> = {
  bob: "0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-6px) rotate(-1deg)}",
  tilt: "0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}",
  wave: "0%,100%{transform:rotate(0deg)}50%{transform:rotate(7deg)}",
  float: "0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-9px) rotate(1deg)}",
  sway: "0%,100%{transform:skewX(0deg) rotate(0deg)}50%{transform:skewX(2deg) rotate(1deg)}",
  pulse: "0%,100%{transform:scale(1)}50%{transform:scale(1.04,0.97)}",
};

export interface AnimatedStickerProps extends StickerProps {
  /** Accessible label for the SVG */
  label: string;
  /** SVG viewBox, e.g. "0 0 200 200" */
  viewBox: string;
  /** White die-cut silhouette. Rendered first, inside the animated group, with a drop shadow. */
  border?: React.ReactNode;
  /** Gentle idle motion, sped up on hover */
  motion?: StickerMotion;
  /** Idle animation duration in seconds */
  duration?: number;
  /** CSS transform-origin for the motion */
  origin?: string;
  children: React.ReactNode;
}

/**
 * Shared frame for the flat-vector sticker packs.
 * Keeps the white die-cut border inside the animated group so the two move as one,
 * and opts into motion only under `prefers-reduced-motion: no-preference`.
 */
export const AnimatedSticker: React.FC<AnimatedStickerProps> = ({
  label,
  viewBox,
  border,
  motion = "bob",
  duration = 3.2,
  origin = "center bottom",
  size = 120,
  width,
  height,
  peel = false,
  className = "",
  style,
  children,
  ...props
}) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "_");
  const shadow = `stu-shadow-${id}`;

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);
  const fast = Math.max(0.6, Number((duration * 0.45).toFixed(2)));

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${id}-root ${className}`}
      style={{ overflow: "visible", ...peelStyle }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="img"
      aria-label={label}
      {...props}
    >
      <style>{`
        @keyframes ${id}-motion { ${KEYFRAMES[motion]} }
        .${id}-art { transform-origin: ${origin}; }
        @media (prefers-reduced-motion: no-preference) {
          .${id}-art { animation: ${id}-motion ${duration}s ease-in-out infinite; }
          .${id}-root:hover .${id}-art { animation-duration: ${fast}s; }
        }
      `}</style>

      <defs>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1A1A1A" floodOpacity="0.22" />
        </filter>
      </defs>

      <g className={`${id}-art`}>
        {border ? <g filter={`url(#${shadow})`}>{border}</g> : null}
        {children}
      </g>
    </svg>
  );
};

export default AnimatedSticker;
