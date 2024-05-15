import { TaskProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ id, title }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-md drop-shadow-md w-full p-5 flex items-center justify-start gap-5 touch-none"
    >
      <input type="checkbox" className="h-5 w-5" />
      {title}
    </div>
  );
}

export default Task;