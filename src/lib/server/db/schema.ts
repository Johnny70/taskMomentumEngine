
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	age: integer('age')
});

export const focusArea = sqliteTable('focus_area', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description'),
	color: text('color'),
	icon: text('icon')
});

export const project = sqliteTable('project', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description'),
	focusAreaId: text('focus_area_id').references(() => focusArea.id),
	progressMetrics: text('progress_metrics'), // JSON string
	aiSummaryFields: text('ai_summary_fields') // JSON string
});

export const task = sqliteTable('task', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description'),
	projectId: text('project_id').references(() => project.id),
	parentTaskId: text('parent_task_id'),
	status: text('status').notNull(),
	estimatedHours: integer('estimated_hours'),
	actualTimeSpent: integer('actual_time_spent'),
	impact: integer('impact'),
	priority: integer('priority'),
	energyRequirement: integer('energy_requirement'),
	aiPredictedDifficulty: integer('ai_predicted_difficulty'),
	aiSuggestedNextAction: text('ai_suggested_next_action'),
	aiRecommendedTimeOfDay: text('ai_recommended_time_of_day'),
	aiDeepWorkSuitability: integer('ai_deep_work_suitability'),
	aiMomentumCurve: text('ai_momentum_curve'), // JSON string
	createdAt: text('created_at'),
	updatedAt: text('updated_at')
});
