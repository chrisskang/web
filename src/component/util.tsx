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

const handleResize = (id: number, size: { width: number; height: number }) => {
  setCanvases(
    canvases.map((canvas) => (canvas.id === id ? { ...canvas, size } : canvas))
  );
};
