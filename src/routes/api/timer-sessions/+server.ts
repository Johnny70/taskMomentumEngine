import { json } from '@sveltejs/kit';
import { createTimerSession, getAllTimerSessions } from '$lib/server/services/timerService';

export async function GET() {
  const sessions = await getAllTimerSessions();
  return json(sessions);
}

export async function POST({ request }) {
  const data = await request.json();
  const [session] = await createTimerSession(data);
  return json(session);
}
