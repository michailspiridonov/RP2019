-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Catalogue
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Catalogue
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Catalogue` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `Catalogue` ;

-- -----------------------------------------------------
-- Table `Catalogue`.`papers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Catalogue`.`papers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(45) NULL DEFAULT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `path` VARCHAR(500) NULL DEFAULT NULL,
  `class` VARCHAR(1) NULL DEFAULT NULL,
  `year` VARCHAR(45) NULL DEFAULT NULL,
  `subject` VARCHAR(45) NULL DEFAULT NULL,
  `mentor` VARCHAR(45) NULL DEFAULT NULL,
  `keywords` VARCHAR(500) NULL DEFAULT NULL,
  `similarity` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 108
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `Catalogue`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Catalogue`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
