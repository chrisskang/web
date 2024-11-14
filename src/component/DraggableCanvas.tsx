"use client";

import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";
import { Resizable } from "react-resizable";

interface DraggableCanvasProps {
  id: string;
  title: string;
  component: ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onResize: (id: string, size: { width: number; height: number }) => void;
}

export default function DraggableCanvas({
  id,
  title,
  position,
  size,
  onResize,
  component,
}: DraggableCanvasProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `canvas-${id}`,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <Resizable
      width={size.width}
      height={size.height}
      onResize={(e, { size }) => onResize(id, size)}
      minConstraints={[200, 200]}
      maxConstraints={[800, 600]}
      handle={
        <div className="w-4 h-4 bg-blue-500 hover:bg-blue-600 absolute bottom-0 right-0 cursor-se-resize z-20 transition-colors" />
      }
    >
      <div
        style={{
          ...style,
          position: "absolute",
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          touchAction: "none",
        }}
        className="bg-white rounded-lg shadow-lg z-10 overflow-hidden border border-gray-200"
      >
        {/* Drag handle at the top */}
        <div
          ref={setNodeRef}
          className="h-8 bg-gray-100 hover:bg-gray-200 transition-colors cursor-move"
          {...attributes}
          {...listeners}
        >
          <div className="px-4 py-2 font-bold text-sm">{title}</div>
        </div>

        {/* Canvas content */}
        <div className="p-4 h-[calc(100%-2rem)]">{component}</div>
      </div>
    </Resizable>
  );
}
