-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2019 at 04:54 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

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
  `minimumAmount` decimal(4,2) DEFAULT NULL,
  `interest` decimal(2,2) NOT NULL
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

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branchID`, `name`, `buildingNo`, `streetName`, `city`, `phoneNumber`) VALUES
('1', NULL, NULL, NULL, NULL, NULL);

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
  `customerID` varchar(10) NOT NULL,
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerID`, `email`) VALUES
('4', '4'),
('nowAdded', '748027c9-41d1-47fd-a89a-4bc70ec6cb78'),
('3', 'em'),
('d61dd01e-8', 'newl1y'),
('9be68b5b-e', 'newly'),
('2e6de03a-1', 'nowAdded2'),
('2', 'sas'),
('1', 'sasindu');

-- --------------------------------------------------------

--
-- Table structure for table `customerlogin`
--

CREATE TABLE `customerlogin` (
  `customerID` varchar(10) DEFAULT NULL,
  `username` varchar(10) NOT NULL
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
  `email` varchar(40) NOT NULL,
  `houseNo` varchar(5) DEFAULT NULL,
  `streetName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `phoneNum` varchar(15) DEFAULT NULL,
  `NIC` varchar(15) DEFAULT NULL,
  `designation` varchar(10) DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  `branchID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeID`, `firstName`, `lastName`, `email`, `houseNo`, `streetName`, `city`, `phoneNum`, `NIC`, `designation`, `salary`, `branchID`) VALUES
('1', 'Hello', NULL, 'dilshara', 'house', 'streetName', 'city', NULL, NULL, NULL, NULL, '1'),
('2', 'sasindu', NULL, 'sasindu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('3', 'dilshara', 'null', 'sasindu.17', 'null', 'null', 'null', 'null', 'null', 'null', '0.00', '1'),
('4', 'dilshara', 'null', 'sasindu.17@cse', 'null', 'null', 'null', 'null', 'null', 'null', '0.00', '1'),
('fd136474-2', 'new', 'null', 'newly', 'house', 'streetName', 'city', 'null', 'null', 'null', '0.00', '1');

-- --------------------------------------------------------

--
-- Table structure for table `employeelogin`
--

CREATE TABLE `employeelogin` (
  `employeeID` varchar(10) DEFAULT NULL,
  `username` varchar(15) NOT NULL
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
-- Table structure for table `loanrequest`
--

CREATE TABLE `loanrequest` (
  `requestID` varchar(10) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `date_` date DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `loanOfficerID` varchar(10) DEFAULT NULL,
  `approvedBy` varchar(10) DEFAULT NULL,
  `branchID` varchar(10) DEFAULT NULL,
  `customerID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(10) NOT NULL,
  `password` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`) VALUES
('sasindu', 'sasindu');

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
-- Table structure for table `monthlyinstallment`
--

CREATE TABLE `monthlyinstallment` (
  `paymentID` varchar(15) NOT NULL,
  `loanNum` varchar(10) DEFAULT NULL,
  `month` varchar(10) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL,
  `datePaid` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offlineloan`
--

CREATE TABLE `offlineloan` (
  `loanNumber` varchar(10) NOT NULL,
  `requestID` varchar(10) DEFAULT NULL
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
  ADD PRIMARY KEY (`customerID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `customerlogin`
--
ALTER TABLE `customerlogin`
  ADD PRIMARY KEY (`username`),
  ADD KEY `customerID` (`customerID`);

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
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `branchID` (`branchID`);

--
-- Indexes for table `employeelogin`
--
ALTER TABLE `employeelogin`
  ADD PRIMARY KEY (`username`),
  ADD KEY `employeeID` (`employeeID`);

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
-- Indexes for table `loanrequest`
--
ALTER TABLE `loanrequest`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `approvedBy` (`approvedBy`),
  ADD KEY `branchID` (`branchID`),
  ADD KEY `customerID` (`customerID`),
  ADD KEY `loanOfficerID` (`loanOfficerID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`employeeID`),
  ADD KEY `branchID` (`branchID`);

--
-- Indexes for table `monthlyinstallment`
--
ALTER TABLE `monthlyinstallment`
  ADD PRIMARY KEY (`paymentID`),
  ADD KEY `loanNum` (`loanNum`);

--
-- Indexes for table `offlineloan`
--
ALTER TABLE `offlineloan`
  ADD PRIMARY KEY (`loanNumber`),
  ADD KEY `requestID` (`requestID`);

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
  ADD CONSTRAINT `child_ibfk_1` FOREIGN KEY (`guardianID`) REFERENCES `individualcustomer` (`customerID`),
  ADD CONSTRAINT `child_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `individualcustomer` (`customerID`);

--
-- Constraints for table `companycustomer`
--
ALTER TABLE `companycustomer`
  ADD CONSTRAINT `companycustomer_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`);

--
-- Constraints for table `customerlogin`
--
ALTER TABLE `customerlogin`
  ADD CONSTRAINT `customerlogin_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`),
  ADD CONSTRAINT `customerlogin_ibfk_2` FOREIGN KEY (`username`) REFERENCES `login` (`username`);

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
-- Constraints for table `employeelogin`
--
ALTER TABLE `employeelogin`
  ADD CONSTRAINT `employeelogin_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`),
  ADD CONSTRAINT `employeelogin_ibfk_2` FOREIGN KEY (`username`) REFERENCES `login` (`username`);

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
-- Constraints for table `loanrequest`
--
ALTER TABLE `loanrequest`
  ADD CONSTRAINT `loanrequest_ibfk_1` FOREIGN KEY (`approvedBy`) REFERENCES `manager` (`employeeID`),
  ADD CONSTRAINT `loanrequest_ibfk_2` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`),
  ADD CONSTRAINT `loanrequest_ibfk_3` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`),
  ADD CONSTRAINT `loanrequest_ibfk_4` FOREIGN KEY (`loanOfficerID`) REFERENCES `employee` (`employeeID`);

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`),
  ADD CONSTRAINT `manager_ibfk_2` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`);

--
-- Constraints for table `monthlyinstallment`
--
ALTER TABLE `monthlyinstallment`
  ADD CONSTRAINT `monthlyinstallment_ibfk_1` FOREIGN KEY (`loanNum`) REFERENCES `loan` (`loanNum`);

--
-- Constraints for table `offlineloan`
--
ALTER TABLE `offlineloan`
  ADD CONSTRAINT `offlineloan_ibfk_1` FOREIGN KEY (`loanNumber`) REFERENCES `loan` (`loanNum`),
  ADD CONSTRAINT `offlineloan_ibfk_2` FOREIGN KEY (`requestID`) REFERENCES `loanrequest` (`requestID`);

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
