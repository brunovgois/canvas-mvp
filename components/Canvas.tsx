import { useOnMouseDraw, point } from "@/hooks/useOnMouseDraw";
import { ChangeEvent, useState } from "react";

type CanvasProps = {
  width: number | string;
  height: number | string;
};
export const Canvas = ({ width, height }: CanvasProps) => {
  const { setCanvasRef, onMouseDown } = useOnMouseDraw(onDraw);

  const [lineWidth, setLineWidth] = useState(1);

  function onDraw(
    ctx: CanvasRenderingContext2D | null | undefined,
    point: point,
    prevPoint: point
  ) {
    if (ctx && point) {
      prevPoint = prevPoint ?? point;
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = "#000000";
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }

  return (
    <div className="flex flex-col">
      <canvas
        className="border border-red-100"
        width={width}
        height={height}
        ref={setCanvasRef}
        onMouseDown={onMouseDown}
      />
      <div className="flex">
        <input
          type="range"
          min="1"
          max="20"
          className="accent-red-500"
          value={lineWidth}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLineWidth(parseInt(e.target.value))
          }
        />
      </div>
    </div>
  );
};
