import { useOnMouseDraw } from "@/hooks/useOnMouseDraw";

type CanvasProps = {
  width: number | string;
  height: number | string;
};
export const Canvas = ({ width, height }: CanvasProps) => {
  const { setCanvasRef, onMouseDown } = useOnMouseDraw(onDraw);

  function onDraw(
    ctx: CanvasRenderingContext2D | null | undefined,
    point: { x: number; y: number } | null
  ) {
    if (ctx && point) {
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fill();
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
