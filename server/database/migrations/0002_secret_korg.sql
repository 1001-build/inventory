CREATE TABLE `stock_item_test_results` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`stock_item_id` text NOT NULL,
	`test_template_id` text,
	`result` integer NOT NULL,
	`value` text,
	`notes` text,
	`attachment_id` text,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `stock_item_test_results_stock_item_idx` ON `stock_item_test_results` (`stock_item_id`);--> statement-breakpoint
CREATE INDEX `stock_item_test_results_user_idx` ON `stock_item_test_results` (`user_id`);--> statement-breakpoint
CREATE INDEX `stock_item_test_results_result_idx` ON `stock_item_test_results` (`result`);--> statement-breakpoint
CREATE TABLE `stock_item_tracking` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`stock_item_id` text NOT NULL,
	`tracking_type` text NOT NULL,
	`quantity` real,
	`location_id_from` text,
	`location_id_to` text,
	`notes` text,
	`user_id` text NOT NULL,
	`deltas` text,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `stock_item_tracking_stock_item_idx` ON `stock_item_tracking` (`stock_item_id`);--> statement-breakpoint
CREATE INDEX `stock_item_tracking_tracking_type_idx` ON `stock_item_tracking` (`tracking_type`);--> statement-breakpoint
CREATE INDEX `stock_item_tracking_user_idx` ON `stock_item_tracking` (`user_id`);--> statement-breakpoint
CREATE INDEX `stock_item_tracking_created_at_idx` ON `stock_item_tracking` (`created_at`);--> statement-breakpoint
CREATE TABLE `stock_items` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`part_id` text NOT NULL,
	`location_id` text NOT NULL,
	`quantity` real DEFAULT 1 NOT NULL,
	`batch` text,
	`serial` text,
	`status` text DEFAULT 'OK' NOT NULL,
	`stocktake_date` integer,
	`stocktake_user_id` text,
	`supplier_part_id` text,
	`purchase_order_id` text,
	`sales_order_id` text,
	`build_id` text,
	`belongs_to_id` text,
	`parent_id` text,
	`expiry_date` integer,
	`packaging` text,
	`notes` text,
	`link` text,
	`owner_id` text,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `stock_items_part_idx` ON `stock_items` (`part_id`);--> statement-breakpoint
CREATE INDEX `stock_items_location_idx` ON `stock_items` (`location_id`);--> statement-breakpoint
CREATE INDEX `stock_items_batch_idx` ON `stock_items` (`batch`);--> statement-breakpoint
CREATE INDEX `stock_items_status_idx` ON `stock_items` (`status`);--> statement-breakpoint
CREATE INDEX `stock_items_expiry_idx` ON `stock_items` (`expiry_date`);--> statement-breakpoint
CREATE INDEX `stock_items_deleted_idx` ON `stock_items` (`deleted_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `stock_items_serial_unique` ON `stock_items` (`serial`);--> statement-breakpoint
CREATE TABLE `stock_location_types` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text NOT NULL,
	`description` text,
	`icon` text,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `stock_location_types_name_idx` ON `stock_location_types` (`name`);--> statement-breakpoint
CREATE TABLE `stock_locations` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`name` text NOT NULL,
	`description` text,
	`parent_id` text,
	`pathstring` text NOT NULL,
	`level` integer DEFAULT 0 NOT NULL,
	`location_type_id` text,
	`structural` integer DEFAULT false NOT NULL,
	`custom_icon` text,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `stock_locations_parent_idx` ON `stock_locations` (`parent_id`);--> statement-breakpoint
CREATE INDEX `stock_locations_pathstring_idx` ON `stock_locations` (`pathstring`);--> statement-breakpoint
CREATE INDEX `stock_locations_level_idx` ON `stock_locations` (`level`);--> statement-breakpoint
CREATE INDEX `stock_locations_name_idx` ON `stock_locations` (`name`);--> statement-breakpoint
CREATE INDEX `stock_locations_location_type_idx` ON `stock_locations` (`location_type_id`);--> statement-breakpoint
CREATE INDEX `stock_locations_deleted_idx` ON `stock_locations` (`deleted_at`);