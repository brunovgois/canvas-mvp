import { useOnMouseDraw, point } from "@/hooks/useOnMouseDraw";

type CanvasProps = {
  width: number | string;
  height: number | string;
};
export const Canvas = ({ width, height }: CanvasProps) => {
  const { setCanvasRef, onMouseDown } = useOnMouseDraw(onDraw);

  function onDraw(
    ctx: CanvasRenderingContext2D | null | undefined,
    point: point,
    prevPoint: point
  ) {
    if (ctx && point) {
      prevPoint = prevPoint ?? point;
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#000000";
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }

  return (
    <canvas
      className="border border-red-100"
      width={width}
      height={height}
      ref={setCanvasRef}
      onMouseDown={onMouseDown}
    />
  );
};
