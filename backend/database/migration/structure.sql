CREATE TABLE `tb_users` (
 `user_id` bigint NOT NULL AUTO_INCREMENT,
 `user_image` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
 `name` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
 `email` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
 `country_code` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
 `phone_number` bigint NOT NULL,
 `password` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
 `is_deleted` tinyint NOT NULL DEFAULT '0',
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`user_id`),
 UNIQUE KEY `country_code` (`country_code`,`phone_number`),
 UNIQUE KEY `email` (`email`(500))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_properties` (
 `property_id` bigint NOT NULL AUTO_INCREMENT,
 `name` mediumtext NOT NULL,
 `address` mediumtext NOT NULL,
 `user_id` bigint NOT NULL,
 `is_deleted` tinyint NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tb_tenants` (
 `tenant_id` bigint NOT NULL AUTO_INCREMENT,
 `user_id` bigint NOT NULL,
 `name` mediumtext NOT NULL,
 `is_deleted` tinyint NOT NULL DEFAULT '0',
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`tenant_id`),
 UNIQUE KEY `user_id` (`user_id`,`email`(500))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
