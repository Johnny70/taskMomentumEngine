import { json } from '@sveltejs/kit';
import { getAllProjects, createProject, deleteProject } from '../../../lib/server/services/projectService';

export async function GET() {
  const projects = await getAllProjects();
  return json(projects);
}

export async function POST({ request }) {
  const data = await request.json();
  const created = await createProject(data);
  return json(created);
}

export async function DELETE({ url }) {
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  await deleteProject(id);
  return new Response('Deleted', { status: 200 });
}
