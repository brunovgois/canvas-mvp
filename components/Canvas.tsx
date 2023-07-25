import { useOnMouseDraw, point } from "@/hooks/useOnMouseDraw";
import { ChangeEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";

type CanvasProps = {
  width: number | string;
  height: number | string;
};
export const Canvas = ({ width, height }: CanvasProps) => {
  const { setCanvasRef, onMouseDown } = useOnMouseDraw(onDraw);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(4);

  function onDraw(
    ctx: CanvasRenderingContext2D | null | undefined,
    point: point,
    prevPoint: point
  ) {
    if (ctx && point) {
      prevPoint = prevPoint ?? point;
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, lineWidth / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  return (
    <div className="flex flex-col">
      <canvas
        className="border border-orange-100 bg-white"
        width={width}
        height={height}
        ref={setCanvasRef}
        onMouseDown={onMouseDown}
      />
      <div className="flex justify-around mt-2">
        <input
          type="range"
          min="1"
          max="20"
          className="accent-black self-start"
          value={lineWidth}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLineWidth(parseInt(e.target.value))
          }
        />
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
};
