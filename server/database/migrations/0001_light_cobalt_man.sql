CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`file_name` text NOT NULL,
	`file_type` text NOT NULL,
	`file_size` integer NOT NULL,
	`r2_key` text NOT NULL,
	`r2_url` text NOT NULL,
	`thumbnail_r2_key` text,
	`thumbnail_r2_url` text,
	`uploaded_by_id` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `attachments_r2_key_idx` ON `attachments` (`r2_key`);--> statement-breakpoint
CREATE INDEX `attachments_uploaded_by_idx` ON `attachments` (`uploaded_by_id`);--> statement-breakpoint
CREATE TABLE `part_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text NOT NULL,
	`description` text,
	`parent_id` text,
	`pathstring` text NOT NULL,
	`level` integer DEFAULT 0 NOT NULL,
	`structural` integer DEFAULT false NOT NULL,
	`default_location_id` text,
	`default_keywords` text,
	`icon` text,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `part_categories_parent_idx` ON `part_categories` (`parent_id`);--> statement-breakpoint
CREATE INDEX `part_categories_pathstring_idx` ON `part_categories` (`pathstring`);--> statement-breakpoint
CREATE INDEX `part_categories_level_idx` ON `part_categories` (`level`);--> statement-breakpoint
CREATE INDEX `part_categories_name_idx` ON `part_categories` (`name`);--> statement-breakpoint
CREATE INDEX `part_categories_deleted_idx` ON `part_categories` (`deleted_at`);--> statement-breakpoint
CREATE TABLE `part_parameter_templates` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text NOT NULL,
	`description` text,
	`units` text
);
--> statement-breakpoint
CREATE INDEX `part_parameter_templates_name_idx` ON `part_parameter_templates` (`name`);--> statement-breakpoint
CREATE TABLE `part_parameters` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`part_id` text NOT NULL,
	`template_id` text,
	`name` text,
	`value` text NOT NULL,
	`units` text
);
--> statement-breakpoint
CREATE INDEX `part_parameters_part_idx` ON `part_parameters` (`part_id`);--> statement-breakpoint
CREATE INDEX `part_parameters_template_idx` ON `part_parameters` (`template_id`);--> statement-breakpoint
CREATE TABLE `parts` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text NOT NULL,
	`full_name` text,
	`description` text,
	`category_id` text NOT NULL,
	`ipn` text,
	`revision` text,
	`keywords` text,
	`active` integer DEFAULT true NOT NULL,
	`virtual` integer DEFAULT false NOT NULL,
	`template` integer DEFAULT false NOT NULL,
	`assembly` integer DEFAULT false NOT NULL,
	`component` integer DEFAULT false NOT NULL,
	`trackable` integer DEFAULT false NOT NULL,
	`purchaseable` integer DEFAULT false NOT NULL,
	`salable` integer DEFAULT false NOT NULL,
	`testable` integer DEFAULT false NOT NULL,
	`locked` integer DEFAULT false NOT NULL,
	`default_location_id` text,
	`minimum_stock` real DEFAULT 0,
	`default_expiry` integer,
	`units` text,
	`notes` text,
	`link` text,
	`image_id` text,
	`created_by_id` text NOT NULL,
	`updated_by_id` text NOT NULL,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `parts_category_idx` ON `parts` (`category_id`);--> statement-breakpoint
CREATE INDEX `parts_name_idx` ON `parts` (`name`);--> statement-breakpoint
CREATE INDEX `parts_active_idx` ON `parts` (`active`);--> statement-breakpoint
CREATE INDEX `parts_deleted_idx` ON `parts` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `parts_purchaseable_idx` ON `parts` (`purchaseable`);--> statement-breakpoint
CREATE INDEX `parts_salable_idx` ON `parts` (`salable`);--> statement-breakpoint
CREATE INDEX `parts_assembly_idx` ON `parts` (`assembly`);--> statement-breakpoint
CREATE INDEX `parts_created_at_idx` ON `parts` (`created_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `parts_ipn_unique` ON `parts` (`ipn`);