
CREATE DATABASE stocks_db;

USE stocks_db;

CREATE TABLE `stocks` 
( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `symbol` VARCHAR(10) NOT NULL ,
  `price` DECIMAL(6,2) NOT NULL ,
  `datetime` VARCHAR(30) NOT NULL )
ENGINE = InnoDB
CHARSET=utf8 COLLATE utf8_bin
COMMENT = 'Stock Tables';
