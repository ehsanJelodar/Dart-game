-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2015 at 08:25 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dart_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE IF NOT EXISTS `score` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `score` int(10) unsigned NOT NULL,
  `lose` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=97 ;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`id`, `name`, `score`, `lose`, `level`) VALUES
(43, 'edvard', 88, 3, 7),
(58, 'ali', 23, 2, 3),
(61, 'Arash', 106, 5, 12),
(63, 'nima', 154, 12, 17);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;    
