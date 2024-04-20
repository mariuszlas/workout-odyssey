DROP TABLE IF EXISTS `users`;

CREATE TABLE
    IF NOT EXISTS `users` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime NOT NULL,
        `last_login` datetime DEFAULT NULL,
        `login_count` int NOT NULL DEFAULT '0',
        `name` varchar(255) NOT NULL,
        `username` varchar(255) NOT NULL,
        `updated_at` datetime NOT NULL,
        `is_demo` tinyint (1) NOT NULL DEFAULT '1',
        PRIMARY KEY (`id`),
        UNIQUE KEY `username` (`username`)
    );

DROP TABLE IF EXISTS `labels`;

CREATE TABLE
    IF NOT EXISTS `labels` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `color` varchar(255) NOT NULL,
        `value` varchar(255) NOT NULL,
        `user_id` bigint NOT NULL,
        `created_at` datetime NOT NULL,
        `updated_at` datetime NOT NULL,
        PRIMARY KEY (`id`),
        KEY `FKjwe9grxkwp2ojnomdy3y1sq02` (`user_id`),
        CONSTRAINT `labels_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `workouts`;

CREATE TABLE
    IF NOT EXISTS `workouts` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `distance` float NOT NULL,
        `duration` float NOT NULL,
        `notes` varchar(255) DEFAULT NULL,
        `pace` float NOT NULL,
        `speed` float NOT NULL,
        `timestamp` datetime NOT NULL,
        `type` varchar(255) NOT NULL,
        `label_id` bigint DEFAULT NULL,
        `user_id` bigint NOT NULL,
        `created_at` datetime NOT NULL,
        `updated_at` datetime NOT NULL,
        `geometry` linestring DEFAULT NULL,
        `timezone` varchar(255) NOT NULL,
        `date_only` tinyint (1) NOT NULL DEFAULT '0',
        PRIMARY KEY (`id`),
        KEY `FK1f3vcxq69yk2eri49k9x5ux76` (`label_id`),
        KEY `FKpf8ql3wbw2drijbk1ugfvki3d` (`user_id`),
        CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`label_id`) REFERENCES `labels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT `workouts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    );