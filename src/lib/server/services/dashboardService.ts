import { db } from '../db';
import { dashboardLayout } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getDashboardLayout(userId: string) {
  const result = await db.select().from(dashboardLayout).where(eq(dashboardLayout.userId, userId));
  return result[0]?.widgetOrder || null;
}

export async function setDashboardLayout(userId: string, widgetOrder: string) {
  // Upsert: update if exists, else insert
  const existing = await db.select().from(dashboardLayout).where(eq(dashboardLayout.userId, userId));
  if (existing.length > 0) {
    await db.update(dashboardLayout)
      .set({ widgetOrder })
      .where(eq(dashboardLayout.userId, userId));
  } else {
    await db.insert(dashboardLayout).values({ userId, widgetOrder });
  }
}
