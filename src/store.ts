import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TaskProps } from '@/types';

export type Task = TaskProps;

export type Tasks = Task[];

export type TaskState = {
  tasks: Task[];
};

export type TaskActions = {
  backupTasks: (tasks: Task[]) => void;
  clearTasks: () => void;
  getTask: (id: number) => Task | undefined;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (task: Task) => void;
};

export const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    (set, get) => ({
      tasks: [],
      backupTasks: (tasks) => set({ tasks }),
      clearTasks: () => set({ tasks: [] }),
      getTask: (id) => get().tasks.find((task) => task.id === id),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (task) =>
        set(() => ({
          tasks: get().tasks.map((t) =>
            t.id === task.id ? { ...t, ...task } : t
          ),
        })),
    }),
    {
      name: 'task-store',
    }
  )
);
