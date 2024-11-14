"use client";

import { DndContext } from "@dnd-kit/core";

import { LayoutDashboard, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import "react-resizable/css/styles.css";
import DraggableCanvas from "./component/DraggableCanvas";
import Droppable from "./component/Droppable";
import ThreeBody from "./pages/threeBody";

interface CanvasItem {
  id: number;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export default function CanvasTestbed() {
  const [canvases, setCanvases] = useState<CanvasItem[]>([
    {
      id: 1,
      title: "Three Body",
      component: <ThreeBody />,
      position: { x: 0, y: 0 },
      size: { width: 400, height: 400 },
    },
    {
      id: 2,
      title: "Th333ree Body",
      component: <ThreeBody />,
      position: { x: 420, y: 0 },
      size: { width: 400, height: 400 },
    },
    // {
    //   id: 3,
    //   content: "Canvas 3",
    //   position: { x: 0, y: 420 },
    //   size: { width: 400, height: 400 },
    // },
    // {
    //   id: 4,
    //   content: "Canvas 4",
    //   position: { x: 420, y: 420 },
    //   size: { width: 400, height: 400 },
    // },
    // {
    //   id: 5,
    //   content: "Canvas 5",
    //   position: { x: 0, y: 840 },
    //   size: { width: 400, height: 400 },
    // },
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
        {/* Dot grid background */}
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] grid-rows-[repeat(auto-fill,minmax(20px,1fr))]">
          {[...Array(1000)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* Floating header */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-2">Testbed</div>
            <nav className="flex justify-center space-x-4">
              <a href="#work" className="text-gray-600 hover:text-gray-800">
                Work
              </a>
              <a href="#info" className="text-gray-600 hover:text-gray-800">
                Info
              </a>
            </nav>
          </div>
        </div>

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
