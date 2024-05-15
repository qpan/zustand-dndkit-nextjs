import { TaskProps } from "@/types";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "@/components/Task";

function Column({ tasks }: { tasks: TaskProps[] }) {
  return (
    <div className="bg-slate-200 rounded-md w-2/4 p-3 flex flex-col gap-4 max-w-lg">
      {!tasks.length && <p className="text-center text-sm text-slate-500">No tasks yet</p>}
      <SortableContext items={tasks || []} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Column;