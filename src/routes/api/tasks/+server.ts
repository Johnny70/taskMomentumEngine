import { json } from '@sveltejs/kit';
import { getAllTasks, createTask, deleteTask } from '../../../lib/server/services/taskService';

export async function GET() {
  const tasks = await getAllTasks();
  return json(tasks);
}

export async function POST({ request }) {
  const data = await request.json();
  const created = await createTask(data);
  return json(created);
}

export async function DELETE({ url }) {
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  await deleteTask(id);
  return new Response('Deleted', { status: 200 });
}
