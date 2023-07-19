import { useCallback, useEffect, useRef } from "react"

export const UseOnMouseDraw = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const mouseMoveListenerRef = useRef<EventListener | null>(null)

  const mouseUpListenerRef = useRef<EventListener | null>(null)

  const initMouseMoveListener = useCallback(() => {
    const mouseMoveListener: EventListener = (e: Event) => {
      if (e instanceof MouseEvent) {
        const point = computePointInCanvas(e.clientX, e.clientY)
        console.log(point)
      }
    }
    mouseMoveListenerRef.current = mouseMoveListener

    window.addEventListener("mousemove", mouseMoveListener)
  }, [])

  useEffect(() => {
    initMouseMoveListener()
    return () => {
      removeListeners()
    }
  }, [initMouseMoveListener])

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
    //todo 
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


  return setCanvasRef
}