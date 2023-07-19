import { useEffect, useRef } from "react"

export const UseOnMouseDraw = () => {
  const canvasRef = useRef(null)

  const mouseMoveListenerRef = useRef(null)

  const mouseUpListenerRef = useRef(null)

  useEffect(() => {
    initMouseMoveListener()
    return () => {
      removeListeners()
    }
  }, [])

  function setCanvasRef(ref) {
    canvasRef.current = ref
  }

  function initMouseMoveListener() {
    const mouseMoveListener = (e) => {
      console.log(e.clientX, e.clientY)
    }
    mouseMoveListenerRef.current = mouseMoveListener

    window.addEventListener("mousemove", mouseMoveListener)
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


  return setCanvasRef
}