-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2019 at 04:30 PM
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
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accountNum` varchar(10) NOT NULL,
  `balance` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accounttype`
--

CREATE TABLE `accounttype` (
  `accountType` varchar(10) NOT NULL,
  `minimumAmount` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `atm`
--

CREATE TABLE `atm` (
  `ATMID` varchar(10) NOT NULL,
  `cashReserve` decimal(10,2) DEFAULT NULL,
  `strretName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `branchResponsible` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `atmwithdrawal`
--

CREATE TABLE `atmwithdrawal` (
  `receiptNum` varchar(10) NOT NULL,
  `ATMID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bankwithdrawl`
--

CREATE TABLE `bankwithdrawl` (
  `receiptNum` varchar(10) NOT NULL,
  `branchID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branchID` varchar(10) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `buildingNo` varchar(5) DEFAULT NULL,
  `streetName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `checkingaccount`
--

CREATE TABLE `checkingaccount` (
  `accountNum` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `child`
--

CREATE TABLE `child` (
  `customerID` varchar(10) NOT NULL,
  `guardianID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `companycustomer`
--

CREATE TABLE `companycustomer` (
  `customerID` varchar(10) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `buldingNum` varchar(5) DEFAULT NULL,
  `streetName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `emailAddress` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `depositreceipt`
--

CREATE TABLE `depositreceipt` (
  `receiptNum` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeID` varchar(10) NOT NULL,
  `firstName` varchar(15) DEFAULT NULL,
  `lastName` varchar(15) DEFAULT NULL,
  `houseNo` varchar(5) DEFAULT NULL,
  `streetName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `phoneNum` varchar(15) DEFAULT NULL,
  `NIC` varchar(15) DEFAULT NULL,
  `designation` varchar(10) DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  `branchID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fixeddeposit`
--

CREATE TABLE `fixeddeposit` (
  `FDNumber` varchar(10) NOT NULL,
  `accountNum` varchar(10) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `dateDeposited` date DEFAULT NULL,
  `interest` decimal(2,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `individualcustomer`
--

CREATE TABLE `individualcustomer` (
  `customerID` varchar(10) NOT NULL,
  `firstName` varchar(15) DEFAULT NULL,
  `lastName` varchar(15) DEFAULT NULL,
  `NIC` varchar(15) DEFAULT NULL,
  `houseNum` varchar(5) DEFAULT NULL,
  `streetName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `emailAddress` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `loan`
--

CREATE TABLE `loan` (
  `loanNum` varchar(10) NOT NULL,
  `customerID` varchar(10) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `dateTaken` date DEFAULT NULL,
  `monthlyInstallment` decimal(8,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `employeeID` varchar(10) NOT NULL,
  `branchID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `onlineloan`
--

CREATE TABLE `onlineloan` (
  `loanNum` varchar(10) NOT NULL,
  `FDNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `receiptNum` varchar(15) NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `accountNum` varchar(10) DEFAULT NULL,
  `date_` date DEFAULT NULL,
  `time_` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `savingsaccount`
--

CREATE TABLE `savingsaccount` (
  `accountNum` varchar(10) NOT NULL,
  `interest` decimal(2,2) DEFAULT NULL,
  `withdrawlsRemaining` int(11) DEFAULT NULL,
  `accountType` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transferreceipt`
--

CREATE TABLE `transferreceipt` (
  `receiptNum` varchar(10) NOT NULL,
  `receivingAccountID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `withdrawalreceipt`
--

CREATE TABLE `withdrawalreceipt` (
  `receiptNum` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountNum`);

--
-- Indexes for table `accounttype`
--
ALTER TABLE `accounttype`
  ADD PRIMARY KEY (`accountType`);

--
-- Indexes for table `atm`
--
ALTER TABLE `atm`
  ADD PRIMARY KEY (`ATMID`),
  ADD KEY `branchResponsible` (`branchResponsible`);

--
-- Indexes for table `atmwithdrawal`
--
ALTER TABLE `atmwithdrawal`
  ADD PRIMARY KEY (`receiptNum`),
  ADD KEY `ATMID` (`ATMID`);

--
-- Indexes for table `bankwithdrawl`
--
ALTER TABLE `bankwithdrawl`
  ADD PRIMARY KEY (`receiptNum`),
  ADD KEY `branchID` (`branchID`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branchID`);

--
-- Indexes for table `checkingaccount`
--
ALTER TABLE `checkingaccount`
  ADD PRIMARY KEY (`accountNum`);

--
-- Indexes for table `child`
--
ALTER TABLE `child`
  ADD PRIMARY KEY (`customerID`),
  ADD KEY `guardianID` (`guardianID`);

--
-- Indexes for table `companycustomer`
--
ALTER TABLE `companycustomer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `depositreceipt`
--
ALTER TABLE `depositreceipt`
  ADD PRIMARY KEY (`receiptNum`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeID`),
  ADD KEY `branchID` (`branchID`);

--
-- Indexes for table `fixeddeposit`
--
ALTER TABLE `fixeddeposit`
  ADD PRIMARY KEY (`FDNumber`),
  ADD KEY `accountNum` (`accountNum`);

--
-- Indexes for table `individualcustomer`
--
ALTER TABLE `individualcustomer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`loanNum`),
  ADD KEY `customerID` (`customerID`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`employeeID`),
  ADD KEY `branchID` (`branchID`);

--
-- Indexes for table `onlineloan`
--
ALTER TABLE `onlineloan`
  ADD PRIMARY KEY (`loanNum`),
  ADD KEY `FDNumber` (`FDNumber`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`receiptNum`),
  ADD KEY `accountNum` (`accountNum`);

--
-- Indexes for table `savingsaccount`
--
ALTER TABLE `savingsaccount`
  ADD PRIMARY KEY (`accountNum`),
  ADD KEY `accountType` (`accountType`);

--
-- Indexes for table `transferreceipt`
--
ALTER TABLE `transferreceipt`
  ADD PRIMARY KEY (`receiptNum`),
  ADD KEY `receivingAccountID` (`receivingAccountID`);

--
-- Indexes for table `withdrawalreceipt`
--
ALTER TABLE `withdrawalreceipt`
  ADD PRIMARY KEY (`receiptNum`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `atm`
--
ALTER TABLE `atm`
  ADD CONSTRAINT `atm_ibfk_1` FOREIGN KEY (`branchResponsible`) REFERENCES `branch` (`branchID`);

--
-- Constraints for table `atmwithdrawal`
--
ALTER TABLE `atmwithdrawal`
  ADD CONSTRAINT `atmwithdrawal_ibfk_1` FOREIGN KEY (`ATMID`) REFERENCES `atm` (`ATMID`);

--
-- Constraints for table `bankwithdrawl`
--
ALTER TABLE `bankwithdrawl`
  ADD CONSTRAINT `bankwithdrawl_ibfk_1` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`),
  ADD CONSTRAINT `bankwithdrawl_ibfk_2` FOREIGN KEY (`receiptNum`) REFERENCES `withdrawalreceipt` (`receiptNum`);

--
-- Constraints for table `checkingaccount`
--
ALTER TABLE `checkingaccount`
  ADD CONSTRAINT `checkingaccount_ibfk_1` FOREIGN KEY (`accountNum`) REFERENCES `account` (`accountNum`);

--
-- Constraints for table `child`
--
ALTER TABLE `child`
  ADD CONSTRAINT `child_ibfk_1` FOREIGN KEY (`guardianID`) REFERENCES `customer` (`customerID`);

--
-- Constraints for table `companycustomer`
--
ALTER TABLE `companycustomer`
  ADD CONSTRAINT `companycustomer_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`);

--
-- Constraints for table `depositreceipt`
--
ALTER TABLE `depositreceipt`
  ADD CONSTRAINT `depositreceipt_ibfk_1` FOREIGN KEY (`receiptNum`) REFERENCES `receipt` (`receiptNum`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`);

--
-- Constraints for table `fixeddeposit`
--
ALTER TABLE `fixeddeposit`
  ADD CONSTRAINT `fixeddeposit_ibfk_1` FOREIGN KEY (`accountNum`) REFERENCES `savingsaccount` (`accountNum`);

--
-- Constraints for table `individualcustomer`
--
ALTER TABLE `individualcustomer`
  ADD CONSTRAINT `individualcustomer_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`);

--
-- Constraints for table `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`);

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`),
  ADD CONSTRAINT `manager_ibfk_2` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`);

--
-- Constraints for table `onlineloan`
--
ALTER TABLE `onlineloan`
  ADD CONSTRAINT `onlineloan_ibfk_1` FOREIGN KEY (`loanNum`) REFERENCES `loan` (`loanNum`),
  ADD CONSTRAINT `onlineloan_ibfk_2` FOREIGN KEY (`FDNumber`) REFERENCES `fixeddeposit` (`FDNumber`);

--
-- Constraints for table `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`accountNum`) REFERENCES `account` (`accountNum`);

--
-- Constraints for table `savingsaccount`
--
ALTER TABLE `savingsaccount`
  ADD CONSTRAINT `savingsaccount_ibfk_1` FOREIGN KEY (`accountNum`) REFERENCES `account` (`accountNum`),
  ADD CONSTRAINT `savingsaccount_ibfk_2` FOREIGN KEY (`accountType`) REFERENCES `accounttype` (`accountType`);

--
-- Constraints for table `transferreceipt`
--
ALTER TABLE `transferreceipt`
  ADD CONSTRAINT `transferreceipt_ibfk_1` FOREIGN KEY (`receivingAccountID`) REFERENCES `account` (`accountNum`),
  ADD CONSTRAINT `transferreceipt_ibfk_2` FOREIGN KEY (`receiptNum`) REFERENCES `account` (`accountNum`);

--
-- Constraints for table `withdrawalreceipt`
--
ALTER TABLE `withdrawalreceipt`
  ADD CONSTRAINT `withdrawalreceipt_ibfk_1` FOREIGN KEY (`receiptNum`) REFERENCES `account` (`accountNum`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
