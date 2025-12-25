CREATE TABLE `focus_area` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`color` text,
	`icon` text
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`focus_area_id` text,
	`progress_metrics` text,
	`ai_summary_fields` text,
	FOREIGN KEY (`focus_area_id`) REFERENCES `focus_area`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`project_id` text,
	`parent_task_id` text,
	`status` text NOT NULL,
	`estimated_hours` integer,
	`actual_time_spent` integer,
	`impact` integer,
	`priority` integer,
	`energy_requirement` integer,
	`ai_predicted_difficulty` integer,
	`ai_suggested_next_action` text,
	`ai_recommended_time_of_day` text,
	`ai_deep_work_suitability` integer,
	`ai_momentum_curve` text,
	`created_at` text,
	`updated_at` text,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `timer_session` (
	`id` text PRIMARY KEY NOT NULL,
	`task_id` text NOT NULL,
	`start` text NOT NULL,
	`stop` text,
	`duration` integer,
	FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`age` integer
);
