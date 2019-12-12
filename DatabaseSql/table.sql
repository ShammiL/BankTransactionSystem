-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2019 at 04:23 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank_transaction_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounttype`
--

CREATE TABLE `accounttype` (
  `accountType` varchar(10) NOT NULL,
  `minimumAmount` decimal(6,2) DEFAULT NULL,
  `interest` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounttype`
--

INSERT INTO `accounttype` (`accountType`, `minimumAmount`, `interest`) VALUES
('Adult', '1000.00', '10.00'),
('Child', '0.00', '12.00'),
('Senior', '1000.00', '13.00'),
('Teen', '500.00', '11.00');

-- --------------------------------------------------------

--
-- Table structure for table `fixeddeposittype`
--

CREATE TABLE `fixeddeposittype` (
  `FDType` char(2) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `interest` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fixeddeposittype`
--

INSERT INTO `fixeddeposittype` (`FDType`, `duration`, `interest`) VALUES
('A', 6, '13.00'),
('B', 12, '14.00'),
('C', 36, '15.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounttype`
--
ALTER TABLE `accounttype`
  ADD PRIMARY KEY (`accountType`);

--
-- Indexes for table `fixeddeposittype`
--
ALTER TABLE `fixeddeposittype`
  ADD PRIMARY KEY (`FDType`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
