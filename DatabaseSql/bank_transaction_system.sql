-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2019 at 03:41 PM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `accountForCustomer` (IN `accountNum` VARCHAR(50), IN `type` VARCHAR(50), IN `accountType` VARCHAR(20), IN `customerID` VARCHAR(150), IN `withdrawalRemaining` INT, IN `balance` DECIMAL(10,2))  BEGIN
    set AUTOCOMMIT = 0;
    if withdrawalRemaining = 0 THEN
    	set withdrawalRemaining = 5;
    end if;
    if balance = null THEN
    	set balance = 0;
    end if;
 	insert into account(accountNum,customerID,balance) values(accountNum,customerID,balance);
    IF type = "checking" THEN
        insert into checkingaccount(accountNum) values(accountNum);
    END IF;
    IF type = "saving" THEN
        insert into savingsaccount(accountNum,	withdrawlsRemaining,accounttype) values(accountNum,withdrawalRemaining,accounttype);
    END IF;
    commit;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addOnlineLoan` (IN `loanNum` VARCHAR(150), IN `customerID` VARCHAR(150), IN `amount` DECIMAL(10,2), IN `dateTaken` DATE, IN `monthlyInstallment` DECIMAL(10,2), IN `duration` INT, IN `FDNumber` VARCHAR(150))  NO SQL
BEGIN
set AUTOCOMMIT = 0;

    insert into loan(loanNum,customerID,amount,dateTaken,monthlyInstallment,	duration) 		        values(loanNum,customerID,amount,dateTaken,monthlyInstallment,duration);
    insert into onlineloan(loanNum,FDNumber) values(loanNum,FDNumber);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `approveLoan` (IN `loanNum` VARCHAR(40), IN `customerID` VARCHAR(50), IN `amount` DECIMAL(50), IN `dateTaken` DATE, IN `monthlyInstallment` DECIMAL(50), IN `duration` INT(15), IN `requestID` VARCHAR(50))  NO SQL
BEGIN
set AUTOCOMMIT = 0;

    insert into loan(loanNum,customerID,amount,dateTaken,monthlyInstallment,	duration) 		        values(loanNum,customerID,amount,dateTaken,monthlyInstallment,duration);
    insert into offlineloan(loanNumber,requestID) values(loanNum,requestID);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `companycustomerLogin` (IN `customerIDnumber` VARCHAR(40), IN `companyName` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(30), IN `type` VARCHAR(30))  BEGIN
set AUTOCOMMIT = 0;
	insert into customer(customerID,email,username,phoneNumber,buildingNumber,streetName,city) values(customerIDnumber,email,nameuser,phoneNumber,buildingNumber,streetName,city);
    insert into companycustomer(customerID,name) values(customerIDnumber,companyName);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createFDaccount` (IN `accountNum` VARCHAR(100), IN `amount` DECIMAL(10,2), IN `FDNumber` VARCHAR(150), IN `duration` INT, IN `dateDeposited` DATE, IN `interest` DECIMAL(2,2))  NO SQL
BEGIN
    set AUTOCOMMIT = 0;
    
    if amount = null THEN
    	set amount = 0;
    end if;
    insert into fixeddeposit(FDNumber,accountNum,amount,duration,	dateDeposited,interest) values(FDNumber,accountNum,amount,duration,dateDeposited,interest);


    commit;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `individualcustomerLogin` (IN `customerIDnumber` VARCHAR(40), IN `firstname` VARCHAR(50), IN `lastname` VARCHAR(50), IN `NIC` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(100), IN `pass` VARCHAR(100), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
	insert into customer(customerID,email,username,phoneNumber,buildingNumber,streetName,city) values(customerIDnumber,email,nameuser,phoneNumber,buildingNumber,streetName,city);
    insert into individualcustomer(customerID,firstName,lastName,NIC) values(customerIDnumber,firstName,lastName,NIC);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `makeOfflineDeposite` (IN `reciptnumber` VARCHAR(200), IN `amount` DECIMAL(10,2), IN `accountID` VARCHAR(50), IN `date_` DATE, IN `time_` TIME, IN `bal` DECIMAL(10,2))  NO SQL
BEGIN
	set AUTOCOMMIT = 0;
    
    insert into receipt(receiptNum,amount,accountNum,date_,time_)values(reciptnumber,amount,accountID,date_,time_);
    insert into depositreceipt(receiptNum) values(reciptnumber);
    UPDATE account SET balance = bal where accountNum =accountID;
    commit;
    
 end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `managerRegister` (IN `employeeIDnum` VARCHAR(40), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `nic` VARCHAR(11), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `salary` VARCHAR(10), IN `designation` VARCHAR(50), IN `branchID` VARCHAR(10), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(50), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
	insert into employee(employeeID,firstName,lastName,username,email,buildingNumber,streetName,city,phoneNumber,NIC,designation,salary,branchID) values(employeeIDnum,firstName,lastName,nameuser,email,buildingNumber,streetName,city,phoneNumber,nic,designation,salary,branchID);
    insert into manager(employeeID) values(employeeIDnum);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `onlineTransfer` (IN `receiptNum` VARCHAR(140), IN `amount` DECIMAL(10,2), IN `accountNumber` VARCHAR(150), IN `date` DATE, IN `time` TIME, IN `receivingAccountID` VARCHAR(150), IN `sen` DECIMAL(8,2), IN `rec` DECIMAL(8,2))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
    	insert into receipt(receiptNum,amount,accountNum,date_,time_) values(receiptNum,amount,accountNumber,date,time);
        insert into transferreceipt(receiptNum,receivingAccountID) values(receiptNum,receivingAccountID);
        UPDATE account SET balance = sen where accountNum =accountNumber;
    UPDATE account SET balance = rec where accountNum =receivingAccountID;
        commit;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `withdrawalAccount` (IN `receiptNum` VARCHAR(60), IN `amount` DECIMAL(10,2), IN `accountNumber` VARCHAR(150), IN `date` DATE, IN `time` TIME, IN `bal` DECIMAL(10,2))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
    	insert into receipt(receiptNum,amount,accountNum,date_,time_) values(receiptNum,amount,accountNumber,date,time);
        insert into withdrawalreceipt(receiptNum) values(receiptNum);
    	UPDATE account SET balance = bal where accountNum =accountNumber;
        
     commit;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `checkFDInstallment` (`customerID_` VARCHAR(100)) RETURNS TINYINT(1) NO SQL
BEGIN

	declare res boolean;
    declare val int;
    
    select count(*) into val from savingsaccount where accountNum in(select accountNum from account where customerID=customerID_);
    if(val>0) THEN
    set res = true;
    end if;
    if(val<=0) THEN
    set res = false;
    end if;
    
   return res;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `checkForonlineLoan` (`customerID_` VARCHAR(200), `value` DECIMAL(10,2)) RETURNS VARCHAR(40) CHARSET latin1 NO SQL
    DETERMINISTIC
BEGIN

	declare has int;
    declare val decimal(10,2);
    declare fd varchar(40);
    declare res varchar(20);
 
    select count(*) into has from fixeddeposit where accountNum in (select accountNum from account where customerID = customerID_);
    select amount into val from fixeddeposit where accountNum in (select accountNum from account where customerID = customerID_);
    select FDNumber into fd from fixeddeposit where accountNum in (select accountNum from account where customerID = customerID_);
    
    if(has>0 and value<=0.6*val) THEN
    	set res = fd;
        return fd;
        end if;
    if(has<=0 or value>0.6*val) THEN
    set res = 'error';
    	end if;
        return res;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `checkRemainingLoanAmount` (`loanNumber` VARCHAR(50)) RETURNS DECIMAL(10,2) BEGIN
     DECLARE amount_ decimal(10,2);
     DECLARE monthlyInstallmentValue decimal(10,2);
     DECLARE times int;
     DECLARE result decimal(10,2);
        select count(*) into times from monthlyinstallment where loanNum = loanNumber;
        select amount into amount_ from loan where loanNum = loanNumber;
        select monthlyInstallment into monthlyInstallmentValue from loan where loanNum = loanNumber;
        set result = amount_-times*monthlyInstallmentValue;
        RETURN result;
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accountNum` varchar(10) NOT NULL,
  `customerID` varchar(100) NOT NULL,
  `balance` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accountNum`, `customerID`, `balance`) VALUES
('1', 'b192b124-4', '222.00'),
('2', 'b192b124-4', '222.00'),
('3', 'b192b124-4', '222.00'),
('4', 'b192b124-4', '222.00'),
('5', 'b192b124-4', '222.00'),
('6', 'b192b124-4', '999999.99'),
('7', 'b192b124-4', '413.40'),
('8', '45880c14-a', '222.00'),
('9', '45880c14-a', '3211.70');

-- --------------------------------------------------------

--
-- Table structure for table `accounttype`
--

CREATE TABLE `accounttype` (
  `accountType` varchar(10) NOT NULL,
  `minimumAmount` decimal(4,2) DEFAULT NULL,
  `interest` decimal(2,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounttype`
--

INSERT INTO `accounttype` (`accountType`, `minimumAmount`, `interest`) VALUES
('child', NULL, '0.00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `allcheckingaccountofacustomer`
-- (See below for the actual view)
--
CREATE TABLE `allcheckingaccountofacustomer` (
`accountNum` varchar(10)
,`customerID` varchar(100)
,`balance` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `allsavingsaccountofacustomer`
-- (See below for the actual view)
--
CREATE TABLE `allsavingsaccountofacustomer` (
`accountNum` varchar(10)
,`customerID` varchar(100)
,`balance` decimal(10,2)
,`withdrawlsRemaining` int(11)
,`accountType` varchar(10)
);

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

--
-- Dumping data for table `checkingaccount`
--

INSERT INTO `checkingaccount` (`accountNum`) VALUES
('1'),
('5'),
('6'),
('7'),
('8');

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
  `name` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companycustomer`
--

INSERT INTO `companycustomer` (`customerID`, `name`) VALUES
('424626e4-f', 'company'),
('a995c926-f', 'comcom'),
('b192b124-4', 'WSO2');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` varchar(10) NOT NULL,
  `email` varchar(40) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `buildingNumber` varchar(255) NOT NULL,
  `streetName` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerID`, `email`, `username`, `phoneNumber`, `buildingNumber`, `streetName`, `city`) VALUES
('1', '', '', '', '', '', ''),
('424626e4-f', 'company', 'company', 'company', 'company', 'company', 'company'),
('45880c14-a', 'individualcustomercusindividualcustomerc', 'individualcustomercusindividualcustomercus', 'individualcusto', 'individualcustomercusindividualcustomercus', 'individualcustomercusindividualcustomercus', 'individualcustomercusindividualcustomercus'),
('66b1811b-f', 'prerson', 'prerson', 'prerson', 'prerson', 'prerson', 'prerson'),
('8116275a-c', 'individualcustomercus', 'individualcustomercus', 'individualcusto', 'individualcustomercus', 'individualcustomercus', 'individualcustomercus'),
('98d1f210-8', 'dilsharasaaasindu@gmail.com', 'sasindu', '1236547891123', 'Building Number', 'Street Name', 'Angoda'),
('a995c926-f', 'comcom', 'comcom', 'comcom', 'comcom', 'comcom', 'comcom'),
('b192b124-4', 'dilsharasaaaaaaaaaaaaaaaaaaaaasindu@gmai', '170024R', '1236547891123', 'b', 'street', 'Angoda');

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
-- Stand-in structure for view `depositereceipts`
-- (See below for the actual view)
--
CREATE TABLE `depositereceipts` (
`receiptNum` varchar(15)
,`amount` decimal(10,2)
,`accountNum` varchar(10)
,`date_` date
,`time_` time
);

-- --------------------------------------------------------

--
-- Table structure for table `depositreceipt`
--

CREATE TABLE `depositreceipt` (
  `receiptNum` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `depositreceipt`
--

INSERT INTO `depositreceipt` (`receiptNum`) VALUES
('1'),
('1001'),
('99');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeID` varchar(10) NOT NULL,
  `firstName` varchar(15) DEFAULT NULL,
  `lastName` varchar(15) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(40) NOT NULL,
  `buildingNumber` varchar(5) DEFAULT NULL,
  `streetName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `NIC` varchar(15) DEFAULT NULL,
  `designation` varchar(10) DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  `branchID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeID`, `firstName`, `lastName`, `username`, `email`, `buildingNumber`, `streetName`, `city`, `phoneNumber`, `NIC`, `designation`, `salary`, `branchID`) VALUES
('0ce37e5b-3', 'employeemanager', 'employeemanager', 'employeemanager', 'employeemanager', 'emplo', 'employeemanager', 'employeemanager', 'employeemanager', 'employeeman', 'manager', '0.00', '1'),
('19619307-1', 'lee', 'lee', 'lee', 'lee', 'lee', 'lee', 'lee', 'lee', 'lee', 'manager', '0.00', '1'),
('537738af-2', 'mmmm', 'mmmm', 'mmmm', 'mmmm', 'mmmm', 'mmmm', 'mmmm', 'mmmm', 'mmmm', 'manager', '0.00', '1'),
('7f177d91-c', 'FirstName', 'LastName', 'shammi', 'dilsharasasindu@gmail.com', 'Build', 'Street Name', 'Angoda', '1231231231', 'NIC', 'manager', '10000.00', '1'),
('8e6d6b1a-b', 'employeer', 'employeer', 'employeer', 'employeer', 'emplo', 'employeer', 'employeer', 'employeer', 'employeer', 'manager', '0.00', '1');

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

--
-- Dumping data for table `fixeddeposit`
--

INSERT INTO `fixeddeposit` (`FDNumber`, `accountNum`, `amount`, `duration`, `dateDeposited`, `interest`) VALUES
('1', '3', '20000.00', 1, '0000-00-00', '0.80'),
('2', '9', '1000.00', 2, '0000-00-00', '0.60'),
('3', '9', '100.00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `getalldataofcompanycustomer`
-- (See below for the actual view)
--
CREATE TABLE `getalldataofcompanycustomer` (
`customerID` varchar(10)
,`username` varchar(100)
,`password` varchar(255)
,`email` varchar(40)
,`phoneNumber` varchar(255)
,`buildingNumber` varchar(255)
,`streetName` varchar(255)
,`city` varchar(255)
,`name` varchar(25)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `getalldataofindividualcustomer`
-- (See below for the actual view)
--
CREATE TABLE `getalldataofindividualcustomer` (
`customerID` varchar(10)
,`username` varchar(100)
,`password` varchar(255)
,`email` varchar(40)
,`phoneNumber` varchar(255)
,`buildingNumber` varchar(255)
,`streetName` varchar(255)
,`city` varchar(255)
,`firstName` varchar(15)
,`lastName` varchar(15)
,`NIC` varchar(15)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `getalldataofmanager`
-- (See below for the actual view)
--
CREATE TABLE `getalldataofmanager` (
`employeeID` varchar(10)
,`username` varchar(100)
,`password` varchar(255)
,`firstName` varchar(15)
,`lastName` varchar(15)
,`email` varchar(40)
,`buildingNumber` varchar(5)
,`streetName` varchar(15)
,`city` varchar(15)
,`phoneNumber` varchar(15)
,`NIC` varchar(15)
,`designation` varchar(10)
,`salary` decimal(8,2)
,`branchID` varchar(10)
);

-- --------------------------------------------------------

--
-- Table structure for table `individualcustomer`
--

CREATE TABLE `individualcustomer` (
  `customerID` varchar(10) NOT NULL,
  `firstName` varchar(15) DEFAULT NULL,
  `lastName` varchar(15) DEFAULT NULL,
  `NIC` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `individualcustomer`
--

INSERT INTO `individualcustomer` (`customerID`, `firstName`, `lastName`, `NIC`) VALUES
('45880c14-a', 'individualcusto', 'individualcusto', 'individualcusto'),
('66b1811b-f', 'prerson', 'prerson', 'prerson'),
('8116275a-c', 'individualcusto', 'individualcusto', 'individualcusto'),
('98d1f210-8', 'FirstName', 'LastName', 'NIC');

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

--
-- Dumping data for table `loan`
--

INSERT INTO `loan` (`loanNum`, `customerID`, `amount`, `dateTaken`, `monthlyInstallment`, `duration`) VALUES
('1', '424626e4-f', '1000.00', '0000-00-00', '10.00', 5),
('1234', '45880c14-a', '100.00', '0000-00-00', '5.00', 8);

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

--
-- Dumping data for table `loanrequest`
--

INSERT INTO `loanrequest` (`requestID`, `description`, `date_`, `approved`, `loanOfficerID`, `approvedBy`, `branchID`, `customerID`) VALUES
('1', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `accessType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`, `accessType`) VALUES
('170024R', '170024R', 'company'),
('comcom', 'comcom', 'company'),
('company', 'company', 'company'),
('employeema', 'employeemanager', 'manager'),
('employeer', 'employeer', 'manager'),
('individualcustomercus', 'individualcustomercus', 'individual'),
('individualcustomercusindividualcustomercus', 'individualcustomercusindividualcustomercus', 'individual'),
('lee', 'lee', 'manager'),
('mmmm', 'mmmm', 'manager'),
('prerson', 'prerson', 'individual'),
('sasindu', 'sasindu', 'individual'),
('shammi', 'shammi', 'manager');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `employeeID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`employeeID`) VALUES
('0ce37e5b-3'),
('19619307-1'),
('537738af-2'),
('7f177d91-c'),
('8e6d6b1a-b');

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

--
-- Dumping data for table `monthlyinstallment`
--

INSERT INTO `monthlyinstallment` (`paymentID`, `loanNum`, `month`, `year`, `datePaid`) VALUES
('1', '1', NULL, NULL, NULL),
('2', '1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `offlineloan`
--

CREATE TABLE `offlineloan` (
  `loanNumber` varchar(10) NOT NULL,
  `requestID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `offlineloan`
--

INSERT INTO `offlineloan` (`loanNumber`, `requestID`) VALUES
('1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `onlineloan`
--

CREATE TABLE `onlineloan` (
  `loanNum` varchar(10) NOT NULL,
  `FDNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `onlineloan`
--

INSERT INTO `onlineloan` (`loanNum`, `FDNumber`) VALUES
('1234', '2');

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

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`receiptNum`, `amount`, `accountNum`, `date_`, `time_`) VALUES
('1', '1.00', '1', '0000-00-00', '00:00:00'),
('10', '200.00', '2', '0000-00-00', '00:00:00'),
('1001', '11.00', '4', '0000-00-00', '00:00:00'),
('1111', '100.00', '1', '0000-00-00', '00:00:00'),
('1112', '1000.00', '1', '0000-00-00', '00:00:00'),
('11sss', '11.00', '3', '0000-00-00', '00:00:00'),
('12', '200.00', '2', '0000-00-00', '00:00:00'),
('121121', '1.00', '4', '0000-00-00', '00:00:00'),
('12121', '5000.00', '5', '0000-00-00', '00:00:00'),
('1234', '200.00', '1', '0000-00-00', '00:00:00'),
('12345', '10000.00', '1', '0000-00-00', '00:00:00'),
('1235', '700.00', '1', '0000-00-00', '00:00:00'),
('14', '200.00', '2', '0000-00-00', '00:00:00'),
('15', '200.00', '1', '0000-00-00', '00:00:00'),
('18', '500.00', '1', '0000-00-00', '00:00:00'),
('1aa', '1111.00', '5', '0000-00-00', '00:00:00'),
('1no', '212.00', '1', '0000-00-00', '00:00:00'),
('1ww1', '1111.00', '5', '0000-00-00', '00:00:00'),
('1wwaz', '21.00', '4', '0000-00-00', '00:00:00'),
('2', '100.00', '1', '0000-00-00', '00:00:00'),
('20', '100.00', '1', '0000-00-00', '00:00:00'),
('3', '100.00', '1', '0000-00-00', '00:00:00'),
('4', '100.00', '1', '0000-00-00', '00:00:00'),
('5', '100.00', '1', '0000-00-00', '00:00:00'),
('6', '200.00', '1', '0000-00-00', '00:00:00'),
('8', '1000.00', '1', '0000-00-00', '00:00:00'),
('99', '800.00', '3', '0000-00-00', '00:00:00'),
('balamu', '21222.00', '6', '0000-00-00', '00:00:00'),
('balamu2', '3000.00', '7', '0000-00-00', '00:00:00'),
('dandan', '1111.00', '1', '0000-00-00', '00:00:00'),
('medan', '1000.00', '3', '0000-00-00', '00:00:00'),
('now', '1000.00', '1', '0000-00-00', '00:00:00'),
('ssssssss', '121212.00', '2', '0000-00-00', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `savingsaccount`
--

CREATE TABLE `savingsaccount` (
  `accountNum` varchar(10) NOT NULL,
  `withdrawlsRemaining` int(11) DEFAULT NULL,
  `accountType` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `savingsaccount`
--

INSERT INTO `savingsaccount` (`accountNum`, `withdrawlsRemaining`, `accountType`) VALUES
('2', 0, 'child'),
('3', 5, 'child'),
('4', 5, 'child'),
('9', 5, 'child');

-- --------------------------------------------------------

--
-- Table structure for table `transferreceipt`
--

CREATE TABLE `transferreceipt` (
  `receiptNum` varchar(10) NOT NULL,
  `receivingAccountID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transferreceipt`
--

INSERT INTO `transferreceipt` (`receiptNum`, `receivingAccountID`) VALUES
('11sss', '1'),
('1no', '2'),
('dandan', '2'),
('now', '2'),
('12345', '3'),
('1ww1', '3'),
('ssssssss', '3'),
('1aa', '4'),
('medan', '4'),
('121121', '5'),
('12121', '6'),
('balamu', '7'),
('1wwaz', '9'),
('balamu2', '9');

-- --------------------------------------------------------

--
-- Stand-in structure for view `transferreceipts`
-- (See below for the actual view)
--
CREATE TABLE `transferreceipts` (
`receiptNum` varchar(15)
,`amount` decimal(10,2)
,`accountNum` varchar(10)
,`date_` date
,`time_` time
,`receivingAccountID` varchar(10)
);

-- --------------------------------------------------------

--
-- Table structure for table `withdrawalreceipt`
--

CREATE TABLE `withdrawalreceipt` (
  `receiptNum` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `withdrawalreceipt`
--

INSERT INTO `withdrawalreceipt` (`receiptNum`) VALUES
('1111'),
('1112'),
('1234'),
('1235'),
('18'),
('2'),
('20'),
('3'),
('4'),
('5'),
('6'),
('8');

-- --------------------------------------------------------

--
-- Structure for view `allcheckingaccountofacustomer`
--
DROP TABLE IF EXISTS `allcheckingaccountofacustomer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `allcheckingaccountofacustomer`  AS  select `account`.`accountNum` AS `accountNum`,`account`.`customerID` AS `customerID`,`account`.`balance` AS `balance` from (`account` join `checkingaccount` on((`account`.`accountNum` = `checkingaccount`.`accountNum`))) ;

-- --------------------------------------------------------

--
-- Structure for view `allsavingsaccountofacustomer`
--
DROP TABLE IF EXISTS `allsavingsaccountofacustomer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `allsavingsaccountofacustomer`  AS  select `account`.`accountNum` AS `accountNum`,`account`.`customerID` AS `customerID`,`account`.`balance` AS `balance`,`savingsaccount`.`withdrawlsRemaining` AS `withdrawlsRemaining`,`savingsaccount`.`accountType` AS `accountType` from (`account` join `savingsaccount` on((`account`.`accountNum` = `savingsaccount`.`accountNum`))) ;

-- --------------------------------------------------------

--
-- Structure for view `depositereceipts`
--
DROP TABLE IF EXISTS `depositereceipts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `depositereceipts`  AS  select `receipt`.`receiptNum` AS `receiptNum`,`receipt`.`amount` AS `amount`,`receipt`.`accountNum` AS `accountNum`,`receipt`.`date_` AS `date_`,`receipt`.`time_` AS `time_` from (`receipt` join `withdrawalreceipt` on((`receipt`.`receiptNum` = `withdrawalreceipt`.`receiptNum`))) ;

-- --------------------------------------------------------

--
-- Structure for view `getalldataofcompanycustomer`
--
DROP TABLE IF EXISTS `getalldataofcompanycustomer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getalldataofcompanycustomer`  AS  select `customer`.`customerID` AS `customerID`,`login`.`username` AS `username`,`login`.`password` AS `password`,`customer`.`email` AS `email`,`customer`.`phoneNumber` AS `phoneNumber`,`customer`.`buildingNumber` AS `buildingNumber`,`customer`.`streetName` AS `streetName`,`customer`.`city` AS `city`,`companycustomer`.`name` AS `name` from ((`login` join `customer` on((`login`.`username` = `customer`.`username`))) join `companycustomer` on((`customer`.`customerID` = `companycustomer`.`customerID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `getalldataofindividualcustomer`
--
DROP TABLE IF EXISTS `getalldataofindividualcustomer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getalldataofindividualcustomer`  AS  select `customer`.`customerID` AS `customerID`,`login`.`username` AS `username`,`login`.`password` AS `password`,`customer`.`email` AS `email`,`customer`.`phoneNumber` AS `phoneNumber`,`customer`.`buildingNumber` AS `buildingNumber`,`customer`.`streetName` AS `streetName`,`customer`.`city` AS `city`,`individualcustomer`.`firstName` AS `firstName`,`individualcustomer`.`lastName` AS `lastName`,`individualcustomer`.`NIC` AS `NIC` from ((`login` join `customer` on((`login`.`username` = `customer`.`username`))) join `individualcustomer` on((`customer`.`customerID` = `individualcustomer`.`customerID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `getalldataofmanager`
--
DROP TABLE IF EXISTS `getalldataofmanager`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `getalldataofmanager`  AS  select `employee`.`employeeID` AS `employeeID`,`login`.`username` AS `username`,`login`.`password` AS `password`,`employee`.`firstName` AS `firstName`,`employee`.`lastName` AS `lastName`,`employee`.`email` AS `email`,`employee`.`buildingNumber` AS `buildingNumber`,`employee`.`streetName` AS `streetName`,`employee`.`city` AS `city`,`employee`.`phoneNumber` AS `phoneNumber`,`employee`.`NIC` AS `NIC`,`employee`.`designation` AS `designation`,`employee`.`salary` AS `salary`,`employee`.`branchID` AS `branchID` from ((`login` join `employee` on((`login`.`username` = `employee`.`username`))) join `manager` on((`employee`.`employeeID` = `manager`.`employeeID`))) ;

-- --------------------------------------------------------

--
-- Structure for view `transferreceipts`
--
DROP TABLE IF EXISTS `transferreceipts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `transferreceipts`  AS  select `receipt`.`receiptNum` AS `receiptNum`,`receipt`.`amount` AS `amount`,`receipt`.`accountNum` AS `accountNum`,`receipt`.`date_` AS `date_`,`receipt`.`time_` AS `time_`,`transferreceipt`.`receivingAccountID` AS `receivingAccountID` from (`receipt` join `transferreceipt` on((`receipt`.`receiptNum` = `transferreceipt`.`receiptNum`))) ;

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
  ADD PRIMARY KEY (`employeeID`);

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
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`);

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
  ADD CONSTRAINT `transferreceipt_ibfk_2` FOREIGN KEY (`receiptNum`) REFERENCES `receipt` (`receiptNum`);

--
-- Constraints for table `withdrawalreceipt`
--
ALTER TABLE `withdrawalreceipt`
  ADD CONSTRAINT `withdrawalreceipt_ibfk_1` FOREIGN KEY (`receiptNum`) REFERENCES `receipt` (`receiptNum`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
