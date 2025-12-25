import { db } from '../db';
import { task } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { Task } from '../../models';

export async function getAllTasks(): Promise<Task[]> {
  return await db.select().from(task);
}

export async function createTask(data: Omit<Task, 'id'>): Promise<Task> {
  const [created] = await db.insert(task).values(data).returning();
  return created;
}

export async function deleteTask(id: string): Promise<void> {
  await db.delete(task).where(eq(task.id, id));
}
