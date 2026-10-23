-- ShopSphere database initialization
USE `shopsphere`;

-- Product categories
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Products
CREATE TABLE IF NOT EXISTS `product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT b'1',
  `units_in_stock` INT DEFAULT NULL,
  `date_created` DATETIME(6) DEFAULT NULL,
  `last_updated` DATETIME(6) DEFAULT NULL,
  `category_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category`
    FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB;