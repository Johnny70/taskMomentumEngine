// Project service for CRUD operations
import { projects } from '../stores';
import type { Project } from '../models';
import { get } from 'svelte/store';

function generateId() {
  return crypto.randomUUID();
}

export function createProject(project: Omit<Project, 'id' | 'tasks'>): Project {
  const newProject: Project = {
    ...project,
    id: generateId(),
    tasks: []
  };
  projects.update(ps => [...ps, newProject]);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'tasks'>>): Project | undefined {
  let updatedProject: Project | undefined;
  projects.update(ps => ps.map(p => {
    if (p.id === id) {
      updatedProject = { ...p, ...updates };
      return updatedProject;
    }
    return p;
  }));
  return updatedProject;
}

export function deleteProject(id: string): void {
  projects.update(ps => ps.filter(p => p.id !== id));
}

export function getProject(id: string): Project | undefined {
  return get(projects).find(p => p.id === id);
}

export function getAllProjects(): Project[] {
  return get(projects);
}
