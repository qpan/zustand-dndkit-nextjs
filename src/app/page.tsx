"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { TaskProps, addTask } from "@/types";
import Column from "@/components/Column";
import Input from "@/components/Input";
import { useTaskStore } from "@/store";

export default function Home() {
  const { tasks, backupTasks, clearTasks, addTask } = useTaskStore((state) => state);

  const addTasks = () => {
    const tasks = [
      { id: 1, title: "Add tests to homepage", pos: 1 },
      { id: 2, title: "Fix Styling in about section", pos: 2 },
      { id: 3, title: "Learn how to center a div", pos: 3 },
    ];

    backupTasks(tasks);
  }

  const handleAddTask: addTask = title => {
    const newTask = { id: tasks.length + 1, title, pos: tasks.length };

    addTask(newTask);
  }

  const getTaskPosition = (tasks: TaskProps[], id: UniqueIdentifier) => {
    return tasks.findIndex((task) => task.id === Number(id));
  };

  const handDragEnd = async ({ active, over }: DragEndEvent) => {
    if (active?.id  === over?.id) return;

    const orignalPosition = getTaskPosition(tasks, active.id);
    const newPosition = getTaskPosition(tasks, over?.id as UniqueIdentifier);

    backupTasks(arrayMove(tasks, orignalPosition, newPosition));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <button onClick={addTasks}>Add Tasks</button>
      <button onClick={clearTasks}>Clear Tasks</button>
      <h1 className="text-3xl font-semibold mb-7">My Tasks ✅</h1>
      <DndContext
        id="tasks"

        sensors={sensors}
        onDragEnd={handDragEnd}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={handleAddTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  )
}
