import { UseOnMouseDraw } from "@/hooks/useOnMouseDraw";

type CanvasProps = {
  width: number | string;
  height: number | string;
};
export const Canvas = ({ width, height }: CanvasProps) => {
  const setCanvasRef = UseOnMouseDraw();

  return (
    <canvas
      className="border border-red-100"
      width={width}
      height={height}
      ref={setCanvasRef}
    />
  );
};
