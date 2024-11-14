import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable-area",
  });

  return (
    <div ref={setNodeRef} className="relative w-full h-full ">
      {children}
    </div>
  );
};

export default Droppable;
