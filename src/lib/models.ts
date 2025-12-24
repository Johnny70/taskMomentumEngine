// Core data models for Personal Workflow OS (PWOS)
// Follows .copilot/instructions.md spec

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  parentTaskId?: string;
  status: 'todo' | 'inProgress' | 'done';
  estimatedHours: number;
  actualTimeSpent: number;
  impact: number; // 0–100
  priority: number; // 0–100
  energyRequirement: number; // 0–100
  aiPredictedDifficulty?: number;
  aiSuggestedNextAction?: string;
  aiRecommendedTimeOfDay?: string;
  aiDeepWorkSuitability?: number;
  aiMomentumCurve?: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  focusAreaId: string;
  tasks: string[]; // Array of Task IDs
  progressMetrics?: Record<string, any>;
  aiSummaryFields?: Record<string, any>;
}

export interface FocusArea {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

// Extend with more models as needed (Timer, Momentum, etc.)
