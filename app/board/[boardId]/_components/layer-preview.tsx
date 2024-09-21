"use client";

import { colorToCSS } from "@/lib/utils";
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import Ellipse from "./ellipse";
import Note from "./note";
import Path from "./path";
import Rectangle from "./rectangle";
import Text from "./text";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = ({
  id,
  onLayerPointerDown,
  selectionColor,
}: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) return null;

  switch (layer.type) {
    case LayerType.Rectangle:
      return (
        <Rectangle
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
          id={id}
          layer={layer}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
          id={id}
          layer={layer}
        />
      );
    case LayerType.Text:
      return (
        <Text
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
          id={id}
          layer={layer}
        />
      );
    case LayerType.Note:
      return (
        <Note
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
          id={id}
          layer={layer}
        />
      );
    case LayerType.Path:
      return (
        <Path
          key={id}
          stroke={selectionColor}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          points={layer.points}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCSS(layer.fill) : "#000"}
        />
      );
    default:
      console.warn("layerType not supported");
      return null;
  }
};
