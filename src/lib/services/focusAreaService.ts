// FocusArea service for CRUD operations
import { focusAreas } from '../stores';
import type { FocusArea } from '../models';
import { get } from 'svelte/store';

function generateId() {
  return crypto.randomUUID();
}

export function createFocusArea(focusArea: Omit<FocusArea, 'id'>): FocusArea {
  const newFocusArea: FocusArea = {
    ...focusArea,
    id: generateId()
  };
  focusAreas.update(fas => [...fas, newFocusArea]);
  return newFocusArea;
}

export function updateFocusArea(id: string, updates: Partial<Omit<FocusArea, 'id'>>): FocusArea | undefined {
  let updatedFocusArea: FocusArea | undefined;
  focusAreas.update(fas => fas.map(fa => {
    if (fa.id === id) {
      updatedFocusArea = { ...fa, ...updates };
      return updatedFocusArea;
    }
    return fa;
  }));
  return updatedFocusArea;
}

export function deleteFocusArea(id: string): void {
  focusAreas.update(fas => fas.filter(fa => fa.id !== id));
}

export function getFocusArea(id: string): FocusArea | undefined {
  return get(focusAreas).find(fa => fa.id === id);
}

export function getAllFocusAreas(): FocusArea[] {
  return get(focusAreas);
}
