// Task service for CRUD operations
import { tasks } from '../stores';
import type { Task } from '../models';
import { get } from 'svelte/store';

function generateId() {
  return crypto.randomUUID();
}

export function createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
  const now = new Date().toISOString();
  const newTask: Task = {
    ...task,
    id: generateId(),
    createdAt: now,
    updatedAt: now
  };
  tasks.update(ts => [...ts, newTask]);
  return newTask;
}

export function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | undefined {
  let updatedTask: Task | undefined;
  tasks.update(ts => ts.map(t => {
    if (t.id === id) {
      updatedTask = { ...t, ...updates, updatedAt: new Date().toISOString() };
      return updatedTask;
    }
    return t;
  }));
  return updatedTask;
}

export function deleteTask(id: string): void {
  tasks.update(ts => ts.filter(t => t.id !== id));
}

export function getTask(id: string): Task | undefined {
  return get(tasks).find(t => t.id === id);
}

export function getAllTasks(): Task[] {
  return get(tasks);
}
