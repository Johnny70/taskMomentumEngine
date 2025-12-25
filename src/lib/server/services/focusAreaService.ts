import { db } from '../db';
import { focusArea } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { FocusArea } from '../../models';

export async function getAllFocusAreas(): Promise<FocusArea[]> {
  return await db.select().from(focusArea);
}

export async function createFocusArea(data: Omit<FocusArea, 'id'>): Promise<FocusArea> {
  const [created] = await db.insert(focusArea).values(data).returning();
  return created;
}

export async function deleteFocusArea(id: string): Promise<void> {
  await db.delete(focusArea).where(eq(focusArea.id, id));
}
