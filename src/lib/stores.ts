// Svelte stores for core PWOS state
import { writable } from 'svelte/store';
import type { Task, Project, FocusArea } from './models';

export const tasks = writable<Task[]>([]);
export const projects = writable<Project[]>([]);
export const focusAreas = writable<FocusArea[]>([]);

// Add derived stores and helpers as needed
