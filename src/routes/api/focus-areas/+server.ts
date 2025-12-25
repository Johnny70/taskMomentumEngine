import { json } from '@sveltejs/kit';
import { getAllFocusAreas, createFocusArea, deleteFocusArea } from '../../../lib/server/services/focusAreaService';

export async function GET() {
  const areas = await getAllFocusAreas();
  return json(areas);
}

export async function POST({ request }) {
  const data = await request.json();
  const created = await createFocusArea(data);
  return json(created);
}

export async function DELETE({ url }) {
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  await deleteFocusArea(id);
  return new Response('Deleted', { status: 200 });
}
