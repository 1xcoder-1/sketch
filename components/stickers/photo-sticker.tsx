"use client";

import React from "react";

interface PhotoStickerProps {
  src: string;
  alt: string;
  size?: number;
  /** Aura glow color (any CSS color). */
  aura?: string;
  /** Static rotation in degrees (the die-cut sticker tilt). */
  rotate?: number;
  className?: string;
}

/**
 * A real-photo cut-out sticker with a die-cut white border and a pulsing
 * colored "aura" glow behind it. The glow lives on a composited layer
 * (opacity/transform only) so it stays inside the frame budget, and it
 * freezes under `prefers-reduced-motion` (styles live in globals.css).
 */
export function PhotoSticker({
  src,
  alt,
  size = 96,
  aura = "#f97316",
  rotate = 0,
  className = "",
}: PhotoStickerProps) {
  return (
    <span
      className={`photo-sticker inline-flex items-center justify-center ${className}`}
      style={
        {
          width: size,
          height: size,
          "--aura": aura,
          "--rot": `${rotate}deg`,
        } as React.CSSProperties
      }
    >
      <span aria-hidden className="photo-sticker-aura" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        className="photo-sticker-img"
        style={{ maxWidth: size, maxHeight: size }}
      />
    </span>
  );
}
