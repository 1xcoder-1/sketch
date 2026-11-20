"use client";

import React, { useState } from "react";

export function usePeel(peel?: boolean, userStyle?: React.CSSProperties) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    transformOrigin: "center center",
    ...userStyle,
  };

  if (!peel) {
    return {
      style: baseStyle,
      onMouseEnter: undefined,
      onMouseLeave: undefined,
    };
  }

  /* Gentle 3D tilt: less resampling keeps the traced vector edges crisp at any zoom. */
  const baseTransform = userStyle?.transform ? `${userStyle.transform} ` : "";
  const transform = hovered
    ? `${baseTransform}perspective(900px) rotateX(6deg) rotateY(-6deg) translateY(-6px) scale(1.05) translateZ(0)`
    : `${baseTransform}perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1) translateZ(0)`;

  const baseFilter = userStyle?.filter ? `${userStyle.filter} ` : "";
  const filter = hovered
    ? `${baseFilter}drop-shadow(0 12px 14px rgba(0, 0, 0, 0.28))`
    : (userStyle?.filter || "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.06))");

  const peelStyle: React.CSSProperties = {
    ...baseStyle,
    cursor: "pointer",
    backfaceVisibility: "hidden",
    transition: "transform 220ms cubic-bezier(0.2, 0.7, 0.3, 1), filter 220ms ease-out",
    transform,
    filter,
  };

  return {
    style: peelStyle,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
}

