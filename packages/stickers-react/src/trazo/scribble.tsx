"use client";

import {
  getViewBoxCenter,
  normalizeRotation,
  shouldUseLayers,
  type StickerDef,
} from "./core";
import { usePeel } from "../utils/usePeel";
import type { CSSProperties, FC, SVGProps } from "react";

export {
  resolveConcreteColor,
  toSvgString,
  type StickerCategory,
  type StickerDef,
  type StickerLayer,
  type ToSvgStringOptions,
} from "./core";

export interface TrazoStickerProps
  extends Omit<SVGProps<SVGSVGElement>, "children" | "color" | "rotate"> {
  def: StickerDef;
  size?: number | string;
  color?: string;
  rotate?: number;
  title?: string;
  peel?: boolean;
  className?: string;
  style?: CSSProperties;
}

export type NamedStickerProps = Omit<TrazoStickerProps, "def">;

export function TrazoSticker({
  def,
  size = 64,
  color,
  rotate,
  title,
  peel = false,
  className = "",
  style,
  overflow,
  ...props
}: TrazoStickerProps) {
  const useLayerArtwork = shouldUseLayers(def, color);
  const normalizedRotate = normalizeRotation(rotate);
  const [cx, cy] = getViewBoxCenter(def.viewBox);
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);
  const artwork = useLayerArtwork ? (
    def.layers!.map((layer, index) => (
      <path key={index} d={layer.d} fill={layer.fill} fillRule="evenodd" />
    ))
  ) : (
    <path
      d={def.d}
      fill={color?.trim() ? color : "var(--sticker-ink, currentColor)"}
      fillRule="evenodd"
    />
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={def.viewBox}
      width={size}
      height={size}
      fill="none"
      overflow={overflow ?? (normalizedRotate !== 0 ? "visible" : undefined)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {normalizedRotate === 0 ? (
        artwork
      ) : (
        <g transform={`rotate(${normalizedRotate} ${cx} ${cy})`}>{artwork}</g>
      )}
    </svg>
  );
}

export function createStickerComponent(def: StickerDef): FC<NamedStickerProps> {
  const Component: FC<NamedStickerProps> = (props) => <TrazoSticker def={def} {...props} />;
  Component.displayName = def.componentName;
  return Component;
}
