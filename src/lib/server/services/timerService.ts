import { db } from '../db';
import { timerSession } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createTimerSession(data) {
  return db.insert(timerSession).values(data).returning();
}

export async function getTimerSessionsByTask(taskId: string) {
  return db.select().from(timerSession).where(eq(timerSession.taskId, taskId));
}

export async function getAllTimerSessions() {
  return db.select().from(timerSession);
}

export async function deleteTimerSession(id: string) {
  return db.delete(timerSession).where(eq(timerSession.id, id));
}
