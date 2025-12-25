import { json } from '@sveltejs/kit';
import { getDashboardLayout, setDashboardLayout } from '$lib/server/services/dashboardService';

// TODO: Ersätt med riktig auth/sessionhantering
const getUserId = (event) => event.locals.user?.id || 'demo-user';

export async function GET({ locals, request }) {
  const userId = getUserId({ locals });
  const widgetOrder = await getDashboardLayout(userId);
  return json({ widgetOrder });
}

export async function POST({ locals, request }) {
  const userId = getUserId({ locals });
  const { widgetOrder } = await request.json();
  await setDashboardLayout(userId, widgetOrder);
  return json({ ok: true });
}
