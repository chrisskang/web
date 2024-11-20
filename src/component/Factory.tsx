"use client";

import { DndContext } from "@dnd-kit/core";

import { LayoutDashboard, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import "react-resizable/css/styles.css";
import ColorShader from "../canvas/colorShader";
import Particle from "../canvas/particleShader";
import ThreeBody from "../canvas/threeBody";
import Background from "./Background";
import DraggableCanvas from "./DraggableCanvas";
import Droppable from "./Droppable";
import FloatingHeader from "./FloatingHeader";

interface CanvasItem {
  id: number;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function Factory() {
  const [canvases, setCanvases] = useState<CanvasItem[]>([
    {
      id: 1,
      title: "Three Body",
      component: <ThreeBody />,
      position: { x: 0, y: 0 },
      size: { width: 800, height: 800 },
    },
    {
      id: 2,
      title: "color",
      component: <ColorShader />,
      position: { x: 820, y: 0 },
      size: { width: 800, height: 800 },
    },
    {
      id: 3,
      title: "particle",
      component: <Particle />,
      position: { x: 0, y: 820 },
      size: { width: 800, height: 800 },
    },
  ]);

  const [layoutOrganized, setLayoutOrganized] = useState(false);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setCanvases(
      canvases.map((canvas) =>
        canvas.id === parseInt(active.id.split("-")[1])
          ? {
              ...canvas,
              position: {
                x: canvas.position.x + delta.x,
                y: canvas.position.y + delta.y,
              },
            }
          : canvas
      )
    );
  };

  const handleResize = (
    id: number,
    size: { width: number; height: number }
  ) => {
    setCanvases(
      canvases.map((canvas) =>
        canvas.id === id ? { ...canvas, size } : canvas
      )
    );
  };

  // Organize layout based on screen size
  const organizeLayout = useCallback(() => {
    const containerWidth = window.innerWidth * 0.8; // Assuming 80% of window width for layout
    const padding = 20;

    // Calculate the number of columns based on screen width using Tailwind breakpoints
    let columns;
    if (window.matchMedia("(min-width: 1536px)").matches) {
      columns = 4; // 2xl
    } else if (window.matchMedia("(min-width: 1280px)").matches) {
      columns = 3; // xl
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
      columns = 2; // lg
    } else {
      columns = 1; // Default for smaller screens (md, sm)
    }

    // Organize canvases into columns
    const columnWidth = (containerWidth - padding * (columns + 1)) / columns;
    console.log(containerWidth, padding, columns);
    console.log("columnWidth", columnWidth);

    const newCanvases = [];
    const columnHeights = Array(columns).fill(0); // Track the height of each column

    canvases.forEach((canvas) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights)); // Find the column with the least height

      const newCanvas = {
        ...canvas,
        size: { ...canvas.size, width: columnWidth },
        position: {
          x: padding + column * (columnWidth + padding),
          y: columnHeights[column],
        },
      };

      newCanvases.push(newCanvas);

      // Update the column height after placing the canvas
      columnHeights[column] += canvas.size.height + padding;
    });

    setCanvases(newCanvases); // Update the canvases with the new positions and sizes
  }, [canvases]);

  // Monitor screen size changes for layout organization
  useEffect(() => {
    const handleResizeEvent = () => {
      if (layoutOrganized) {
        organizeLayout();
      }
    };

    // Attach event listeners for each Tailwind breakpoint
    const sm = window.matchMedia("(min-width: 640px)");
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const xl = window.matchMedia("(min-width: 1280px)");
    const xxl = window.matchMedia("(min-width: 1536px)");

    sm.addEventListener("change", handleResizeEvent);
    md.addEventListener("change", handleResizeEvent);
    lg.addEventListener("change", handleResizeEvent);
    xl.addEventListener("change", handleResizeEvent);
    xxl.addEventListener("change", handleResizeEvent);

    // Cleanup listeners on component unmount
    return () => {
      sm.removeEventListener("change", handleResizeEvent);
      md.removeEventListener("change", handleResizeEvent);
      lg.removeEventListener("change", handleResizeEvent);
      xl.removeEventListener("change", handleResizeEvent);
      xxl.removeEventListener("change", handleResizeEvent);
    };
  }, [layoutOrganized, organizeLayout]);

  // Toggle layout organization
  const toggleLayout = () => {
    setLayoutOrganized((prev) => {
      const newLayoutOrganized = !prev;
      if (newLayoutOrganized) {
        organizeLayout(); // Trigger layout organization immediately when enabled
      }
      return newLayoutOrganized;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-100 relative overflow-hidden">
        <Background />
        <FloatingHeader />

        {/* Main content */}
        <main className="container mx-auto px-4 py-20 relative h-screen">
          {/* Toggle Layout button */}
          <button
            onClick={toggleLayout}
            className={`mb-4 p-2 text-white rounded hover:bg-blue-600 transition-colors z-20 relative flex items-center ${
              layoutOrganized ? "bg-green-500" : "bg-blue-500"
            }`}
            aria-label="Toggle Layout"
          >
            {layoutOrganized ? (
              <XCircle size={16} />
            ) : (
              <LayoutDashboard size={16} />
            )}
          </button>

          {/* Droppable area for canvases */}
          <Droppable>
            {/* Canvas components */}

            {canvases.map((canvas) => (
              <DraggableCanvas
                key={canvas.id}
                id={canvas.id}
                title={canvas.title}
                component={canvas.component}
                position={canvas.position}
                size={canvas.size}
                onResize={handleResize}
              />
            ))}
          </Droppable>
        </main>
      </div>
    </DndContext>
  );
}
