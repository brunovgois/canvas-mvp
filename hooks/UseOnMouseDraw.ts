import { useEffect, useRef } from "react"

export type point = {
  x: number; y: number
} | null

type UseOnMouseDrawProps = (
  ctx: CanvasRenderingContext2D | null | undefined,
  point: point,
  prevPoint: point
) => void;

export const useOnMouseDraw = (onDraw: UseOnMouseDrawProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const prevPointRef = useRef<point>(null)

  const mouseMoveListenerRef = useRef<EventListener | null>(null)
  const mouseUpListenerRef = useRef<EventListener | null>(null)

  useEffect(() => {
    function initMouseMoveListener() {
      const mouseMoveListener = (e: Event) => {
        if (e instanceof MouseEvent && isDrawingRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY)
          const ctx = canvasRef.current?.getContext("2d")
          if (ctx) {
            onDraw(ctx, point, prevPointRef.current)
            prevPointRef.current = point
          }
        }
      }
      mouseMoveListenerRef.current = mouseMoveListener
      window.addEventListener("mousemove", mouseMoveListener)
    }

    function initMouseUpListener() {
      const mouseUpListener = () => {
        isDrawingRef.current = false
        prevPointRef.current = null
      };
      mouseUpListenerRef.current = mouseUpListener
      window.addEventListener("mouseup", mouseUpListener)
    }

    initMouseUpListener()
    initMouseMoveListener()

    return () => {
      removeListeners()
    }
  }, [onDraw])

  function setCanvasRef(ref: HTMLCanvasElement) {
    canvasRef.current = ref
  }

  function removeListeners() {
    if (mouseMoveListenerRef.current) {
      window.removeEventListener("mousemove", mouseMoveListenerRef.current)
    }
    if (mouseUpListenerRef.current) {
      window.removeEventListener("mouseup", mouseUpListenerRef.current)
    }
  }

  function onMouseDown() {
    isDrawingRef.current = true
  }

  function computePointInCanvas(clientX: number, clientY: number) {
    if (canvasRef.current) {
      const boundingCanvasRect = canvasRef.current.getBoundingClientRect()
      return {
        x: clientX - boundingCanvasRect.left,
        y: clientY - boundingCanvasRect.top
      }
    }
    return null
  }

  return { setCanvasRef, onMouseDown }
}