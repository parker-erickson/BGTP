CREATE TABLE `user` (
	`id` int NOT NULL AUTO_INCREMENT,
	`username` varchar(32),
	`email` varchar(64),
	`password` varchar(128),
	`phone_number` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `listing` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int,
	`game_id` int NOT NULL,
	`photo_url` varchar(255),
	`condition` varchar(10),
	`description` varchar(255),
	`shipping_price` DECIMAL(65) NOT NULL,
	`price` DECIMAL(65),
	`title` varchar(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `shopping_cart` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`listing_id` int NOT NULL,
	`quantitiy` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `game` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`category` varchar(255),
	`avg_price` decimal(65),
	PRIMARY KEY (`id`)
);

ALTER TABLE `listing` ADD CONSTRAINT `listing_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `listing` ADD CONSTRAINT `listing_fk1` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`);

ALTER TABLE `shopping_cart` ADD CONSTRAINT `shopping_cart_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `shopping_cart` ADD CONSTRAINT `shopping_cart_fk1` FOREIGN KEY (`listing_id`) REFERENCES `listing`(`id`);
