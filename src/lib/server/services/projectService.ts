import { db } from '../db';
import { project } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { Project } from '../../models';

export async function getAllProjects(): Promise<Project[]> {
  return await db.select().from(project);
}

export async function createProject(data: Omit<Project, 'id' | 'tasks'>): Promise<Project> {
  const [created] = await db.insert(project).values(data).returning();
  return created;
}

export async function deleteProject(id: string): Promise<void> {
  await db.delete(project).where(eq(project.id, id));
}
