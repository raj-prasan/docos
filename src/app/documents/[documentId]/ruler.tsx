"use client";
import { useRef, useState, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useEditorStore } from "@/store/use-editor-store";
const markers = Array.from({ length: 83 }, (_, i) => i)

export const Ruler = () => {
  const PAGE_WIDTH = 816;
  const DEFAULT_PADDING = 56;
  const MIN_CONTENT_WIDTH = 200;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { editor } = useEditorStore();

  const [leftPad, setLeftPad] = useState<number>(DEFAULT_PADDING);
  const [rightPad, setRightPad] = useState<number>(DEFAULT_PADDING);
  const [draggingSide, setDraggingSide] = useState<null | "left" | "right">(null);

  // Initialize from editor DOM
  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom as HTMLElement;
    const lp = parseInt(dom.style.paddingLeft || `${DEFAULT_PADDING}`);
    const rp = parseInt(dom.style.paddingRight || `${DEFAULT_PADDING}`);
    if (!Number.isNaN(lp)) setLeftPad(lp);
    if (!Number.isNaN(rp)) setRightPad(rp);
  }, [editor]);

  // Apply padding to editor DOM
  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom as HTMLElement;
    dom.style.paddingLeft = `${leftPad}px`;
    dom.style.paddingRight = `${rightPad}px`;
  }, [leftPad, rightPad, editor]);

  const clampLeft = (desiredLeft: number) => {
    // ensure minimum content width
    const maxLeft = Math.max(0, PAGE_WIDTH - MIN_CONTENT_WIDTH - rightPad);
    return Math.max(0, Math.min(desiredLeft, maxLeft));
  };
  const clampRight = (desiredRight: number) => {
    const maxRight = Math.max(0, PAGE_WIDTH - MIN_CONTENT_WIDTH - leftPad);
    return Math.max(0, Math.min(desiredRight, maxRight));
  };

  const startDrag = (side: "left" | "right") => (e: ReactMouseEvent) => {
    e.preventDefault();
    setDraggingSide(side);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const onMove = (ev: MouseEvent) => {
      const x = ev.clientX - rect.left; // position within ruler
      if (side === "left") {
        const desiredLeft = Math.max(0, Math.min(PAGE_WIDTH, x));
        setLeftPad(clampLeft(desiredLeft));
      } else {
        const desiredRight = Math.max(0, Math.min(PAGE_WIDTH, PAGE_WIDTH - x));
        setRightPad(clampRight(desiredRight));
      }
    };
    const onUp = () => {
      setDraggingSide(null);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const resetSide = (side: "left" | "right") => () => {
    if (side === "left") setLeftPad(DEFAULT_PADDING);
    else setRightPad(DEFAULT_PADDING);
  };

  return (
    <div className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
      <div id="ruler-container" ref={containerRef} className="max-w-[816px] mx-auto w-full h-full relative">
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const pos = (marker * 816) / 82
              const isMajor = marker % 10 === 0
              const isMid = !isMajor && marker % 2 === 0
              const height = isMajor ? 'h-2' : isMid ? 'h-2.5' : 'h-1.5'
              return (
                <div key={marker} className="absolute bottom-0" style={{ left: `${pos}px` }}>
                  <div className={`w-px bg-gray-400 ${height}`} />
                  {isMajor && (
                    <div className="text-[10px] text-gray-500 translate-x-[-50%]">
                      {marker}
                    </div>
                  )}
                </div>
              )
            })}

            <Marker
              position={leftPad}
              isLeft
              isDragging={draggingSide === "left"}
              onMouseDown={startDrag("left")}
              onDoubleClick={resetSide("left")}
            />
            <Marker
              position={PAGE_WIDTH - rightPad}
              isLeft={false}
              isDragging={draggingSide === "right"}
              onMouseDown={startDrag("right")}
              onDoubleClick={resetSide("right")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
 
interface MarkerProps {
  position : number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown : (e: ReactMouseEvent) => void;
  onDoubleClick: (e: ReactMouseEvent) => void;
}
const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick
}: MarkerProps) =>{
  return (
    <div
      className="absolute -top-1.5 z-10 select-none"
      style={{ left: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {/* pointer triangle */}
      <div
        className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-gray-600"
        style={{ transform: "translateX(-50%)" }}
        aria-hidden
      />
      {/* draggable handle */}
      <div
        
        className={`h-4 w-1.5 rounded-sm cursor-ew-resize ${
          isDragging ? "bg-gray-800" : "bg-gray-600 hover:bg-gray-700"
        }`}
        style={{ transform: "translate(-50%, 0)" }}
        role="slider"
        aria-orientation="horizontal"
        aria-label={isLeft ? "Left margin" : "Right margin"}
      />
    </div>
  )
}