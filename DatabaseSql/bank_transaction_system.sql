-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2019 at 07:29 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `accountForCustomer` (IN `accountNum` VARCHAR(50), IN `type` VARCHAR(50), IN `accountType` VARCHAR(20), IN `customerID` VARCHAR(150), IN `withdrawalRemaining` INT, IN `balance` DECIMAL(10,2), IN `branchID` VARCHAR(150), IN `closed` TINYINT, IN `gurNic` VARCHAR(15))  BEGIN
    set AUTOCOMMIT = 0;
    if withdrawalRemaining = 0 THEN
    	set withdrawalRemaining = 5;
    end if;
    if balance = null THEN
    	set balance = 0;
    end if;
 	insert into account(accountNum,customerID,balance,branchID,closed) values(accountNum,customerID,balance,branchID,closed);
    IF type = "checking" THEN
        insert into checkingaccount(accountNum) values(accountNum);
    END IF;
    IF type = "saving" THEN
        insert into savingsaccount(accountNum,	withdrawlsRemaining,accounttype) values(accountNum,withdrawalRemaining,accounttype);
    END IF;
    IF accountType = "child" THEN
        insert into child(customerID,guardianID) values(customerID,gurNic);
    END IF;
    commit;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addOnlineLoan` (IN `loanNum` VARCHAR(150), IN `customerID` VARCHAR(150), IN `amount` DECIMAL(10,2), IN `dateTaken` DATE, IN `monthlyInstallment` DECIMAL(10,2), IN `duration` INT, IN `FDNumber_` VARCHAR(150))  NO SQL
BEGIN
set AUTOCOMMIT = 0;

    insert into loan(loanNum,customerID,amount,dateTaken,monthlyInstallment,	duration) 		        values(loanNum,customerID,amount,dateTaken,monthlyInstallment,duration);
    insert into onlineloan(loanNum,FDNumber) values(loanNum,FDNumber_);

    update account set balance = (select depositOnlineLoantoFD(FDNumber_,amount)) where accountNum = (select accountNum from fixeddeposit where FDNumber = FDNumber_);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `approveLoan` (IN `loanNum` VARCHAR(40), IN `customerID` VARCHAR(50), IN `amount` DECIMAL(50), IN `dateTaken` DATE, IN `monthlyInstallment` DECIMAL(50), IN `duration` INT(15), IN `requestID_` VARCHAR(50), IN `managerID` VARCHAR(150))  NO SQL
BEGIN
set AUTOCOMMIT = 0;

	update loanrequest set approved=true,approvedBy = managerID where requestID=requestID_;
    insert into loan(loanNum,customerID,amount,dateTaken,monthlyInstallment,	duration) 		        values(loanNum,customerID,amount,dateTaken,monthlyInstallment,duration);
    insert into offlineloan(loanNumber,requestID) values(loanNum,requestID_);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atmwithdrawalAccount` (IN `receiptNum` VARCHAR(60), IN `amount` DECIMAL(10,2), IN `accountNumber` VARCHAR(150), IN `date` DATE, IN `time` TIME, IN `bal` DECIMAL(10,2), IN `ATMID_` VARCHAR(150), IN `atmbal` DECIMAL(10,2))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
    	insert into receipt(receiptNum,amount,accountNum,date_,time_) values(receiptNum,amount,accountNumber,date,time);
        insert into withdrawalreceipt(receiptNum) values(receiptNum);
    	UPDATE account SET balance = bal where accountNum =accountNumber;
        insert into atmwithdrawal(receiptNum,ATMID) values(receiptNum,ATMID_);
        UPDATE atm SET cashReserve = atmbal where ATMID =ATMID_;
        
     commit;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `childCustomerRegister` (IN `customerIDnumber` VARCHAR(100), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(50), IN `buildingNumber` VARCHAR(15), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(500), IN `type` VARCHAR(50), IN `guardianID` VARCHAR(100))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
	insert into customer(customerID,email,username,phoneNumber,buildingNumber,streetName,city) values(customerIDnumber,email,nameuser,phoneNumber,buildingNumber,streetName,city);
    insert into childcustomer(customerID,firstName,lastName,guardingID) values(customerIDnumber,firstName,lastName,guardianID);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `companycustomerLogin` (IN `customerIDnumber` VARCHAR(40), IN `companyName` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(300), IN `type` VARCHAR(30))  BEGIN
set AUTOCOMMIT = 0;
	insert into customer(customerID,email,username,phoneNumber,buildingNumber,streetName,city) values(customerIDnumber,email,nameuser,phoneNumber,buildingNumber,streetName,city);
    insert into companycustomer(customerID,name) values(customerIDnumber,companyName);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `companycustomerUpdate` (IN `customerIDnumber` VARCHAR(40), IN `companyName` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(300), IN `type` VARCHAR(30))  BEGIN
set AUTOCOMMIT = 0;
		call deleteCompanyCustomer(customerIDnumber);
        call `companycustomerLogin`( `customerIDnumber`,`companyName`,`email`,`phoneNumber`,`buildingNumber`,`streetName`,`city`,`nameuser`,`pass`,`type`);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createFDaccount` (IN `accountNum` VARCHAR(100), IN `amount` DECIMAL(10,2), IN `FDNumber` VARCHAR(150), IN `dateDeposited` DATE, IN `FDType` VARCHAR(50))  NO SQL
BEGIN
    set AUTOCOMMIT = 0;
    if amount = null THEN
    	set amount = 0;
    end if;
    insert into fixeddeposit(FDNumber,accountNum,amount,	dateDeposited,FDType) values(FDNumber,accountNum,amount,dateDeposited,FDType);
    commit;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteCompanyCustomer` (IN `customerIDnumber` VARCHAR(255))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
    DELETE FROM companycustomer where customerID = customerIDnumber;
    DELETE FROM login  where username = (select username from customer where customerID = customerIDnumber);
	DELETE FROM customer where customerID = customerIDnumber;
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteManager` (IN `employeeIDNumber` VARCHAR(150))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
    DELETE FROM manager where employeeID = employeeIDNumber;
    DELETE FROM login  where username = (select username from employee where employeeID = employeeIDNumber);
	DELETE FROM employee where employeeID = employeeIDNumber;
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteOtherEmployee` (IN `employeeIDNumber` VARCHAR(150))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
    DELETE FROM login  where username = (select username from employee where employeeID = employeeIDNumber);
	DELETE FROM employee where employeeID = employeeIDNumber;
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `individualcustomerDelete` (IN `customerIDnumber` VARCHAR(40))  BEGIN
set AUTOCOMMIT = 0;
    DELETE FROM individualcustomer where customerID = customerIDnumber;
    DELETE FROM login  where username = (select username from customer where customerID = customerIDnumber);
	DELETE FROM customer where customerID = customerIDnumber;
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `individualcustomerLogin` (IN `customerIDnumber` VARCHAR(40), IN `firstname` VARCHAR(50), IN `lastname` VARCHAR(50), IN `NIC` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(100), IN `pass` VARCHAR(300), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
	insert into customer(customerID,email,username,phoneNumber,buildingNumber,streetName,city) values(customerIDnumber,email,nameuser,phoneNumber,buildingNumber,streetName,city);
    insert into individualcustomer(customerID,firstName,lastName,NIC) values(customerIDnumber,firstName,lastName,NIC);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `individualcustomerUpdate` (IN `customerIDnumber` VARCHAR(40), IN `firstname` VARCHAR(50), IN `lastname` VARCHAR(50), IN `NIC` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(100), IN `pass` VARCHAR(300), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
	update login set username=nameuser, password = pass, accessType=type where username = (select username from customer where customerID = customerIDnumber);
                                                                                 update customer set email = email,username=nameuser,phoneNumber=phoneNumber,buildingNumber=buildingNumber,streetName=streetName,city=city where customerID = customerIDnumber;
                                                                                 update individualcustomer set firstName = firstname,lastName = lastName,NIC=NIC where customerID=customerIDnumber;
                                                                                             
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `managerRegister` (IN `employeeIDnum` VARCHAR(40), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `nic` VARCHAR(11), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `salary` VARCHAR(10), IN `designation` VARCHAR(50), IN `branchID` VARCHAR(10), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(500), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
	insert into employee(employeeID,firstName,lastName,username,email,buildingNumber,streetName,city,phoneNumber,NIC,designation,salary,branchID) values(employeeIDnum,firstName,lastName,nameuser,email,buildingNumber,streetName,city,phoneNumber,nic,designation,salary,branchID);
    insert into manager(employeeID) values(employeeIDnum);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `managerRegisterUpdate` (IN `employeeIDnum` VARCHAR(40), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `nic` VARCHAR(11), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `salary` VARCHAR(10), IN `designation` VARCHAR(50), IN `branchID` VARCHAR(10), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(500), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
		call deleteManager(employeeIDnum);
		call `managerRegister`(`employeeIDnum`,`firstName`,`lastName`,`nic`,`email`,`phoneNumber`,`buildingNumber`, `streetName`,`city`,`salary`,`designation` , `branchID`,`nameuser` ,`pass`,`type`);
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `otherEmployeeRegisterProcedure` (IN `employeeIDnum` VARCHAR(40), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `nic` VARCHAR(11), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `salary` VARCHAR(10), IN `designation` VARCHAR(50), IN `branchID` VARCHAR(10), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(500), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
	insert into employee(employeeID,firstName,lastName,username,email,buildingNumber,streetName,city,phoneNumber,NIC,designation,salary,branchID) values(employeeIDnum,firstName,lastName,nameuser,email,buildingNumber,streetName,city,phoneNumber,nic,designation,salary,branchID);
    insert into login(username,password,accessType) values(nameuser,pass,type);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `otherEmployeeRegisterUpdate` (IN `employeeIDnum` VARCHAR(40), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `nic` VARCHAR(11), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `salary` VARCHAR(10), IN `designation` VARCHAR(50), IN `branchID` VARCHAR(10), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(500), IN `type` VARCHAR(50))  BEGIN
set AUTOCOMMIT = 0;
		call deleteOtherEmployee(employeeIDnum);
		call `managerRegister`(`employeeIDnum`,`firstName`,`lastName`,`nic`,`email`,`phoneNumber`,`buildingNumber`, `streetName`,`city`,`salary`,`designation` , `branchID`,`nameuser` ,`pass`,`type`);
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `withdrawalAccount` (IN `receiptNum` VARCHAR(60), IN `amount` DECIMAL(10,2), IN `accountNumber` VARCHAR(150), IN `date` DATE, IN `time` TIME, IN `bal` DECIMAL(10,2), IN `branchID` VARCHAR(150))  NO SQL
BEGIN
set AUTOCOMMIT = 0;
    	insert into receipt(receiptNum,amount,accountNum,date_,time_) values(receiptNum,amount,accountNumber,date,time);
        insert into withdrawalreceipt(receiptNum) values(receiptNum);
    	UPDATE account SET balance = bal where accountNum =accountNumber;
        insert into bankwithdrawl(receiptNum,branchID) values(receiptNum,branchID);
        update `savingsaccount` set `withdrawlsRemaining` = (select getRemainingWithdrawal(accountNumber)-1) WHERE accountNum = accountNumber;
        commit;
     commit;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `checkFDAccountInterest` (`FDNumber_` VARCHAR(150)) RETURNS DECIMAL(10,2) NO SQL
BEGIN

	DECLARE result decimal(10,2);
    declare customer int;
    declare interest_ decimal(10,2);
    declare amount_ decimal(10,2);
    
    select count(customerID) into customer from account where accountNum in (select accountNum from fdaccountdetails where FDNumber = FDNumber_);
    if(customer<=0) THEN
    	set result = -1;
        return result;
    end IF;
    IF(customer>0) THEN
    	select amount into amount_ from fdaccountdetails where FDNumber = FDNumber_;
        select interest into interest_ from fdaccountdetails where FDNumber = FDNumber_;
        select interest_*amount_/100 into result;
        return result;
    end if;
END$$

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
 
    SELECT count(*) into has FROM `fixeddeposit` natural join savingsaccount natural join account where customerID = customerID_ order by amount desc limit 1;
    SELECT amount into val FROM `fixeddeposit` natural join savingsaccount natural join account where customerID = customerID_ order by amount desc limit 1;
    SELECT FDNumber into fd FROM `fixeddeposit` natural join savingsaccount natural join account where customerID = customerID_ order by amount desc limit 1;
    
    if(has>0 and value<=0.6*val) THEN
    	set res = fd;
        return res;
        end if;
    if(has<=0 or value>0.6*val) THEN
    set res = 'error';
    	return res;
    	end if;
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

CREATE DEFINER=`root`@`localhost` FUNCTION `checkValidateOfRegister` (`username_` VARCHAR(100), `email_` VARCHAR(100), `nic_` VARCHAR(15), `branch_` VARCHAR(100), `type` VARCHAR(30)) RETURNS VARCHAR(40) CHARSET latin1 NO SQL
    DETERMINISTIC
BEGIN

declare email__ int;
declare username__ int;
declare branch__ int;
declare nic__ int;
declare res varchar(30);

set res = "OK";
set branch__ = -1;

if(type = "individual") then
select count(*) into username__ from login where username = username_;
select count(*) into nic__ from individualcustomer where NIC = nic_;
select count(*) into email__ from customer where email = email_;
end if;

IF(type = "company") then

select count(*) into username__ from login where username = username_;
select count(*) into email__ from customer where email = email_;
end if;

if(type = "manager") then

select count(*) into username__ from login where username = username_;
select count(*) into email__ from employee where email = email_;
select count(*) into branch__ from branch where branchID = branch_;
select count(*) into nic__ from employee where NIC = nic_;

end if;

if(type = "Child") then

select count(*) into username__ from login where username = username_;
end if;

if(type = "other") then

select count(*) into username__ from login where username = username_;
select count(*) into email__ from employee where email = email_;
select count(*) into branch__ from branch where branchID = branch_;
end if;

if(email__>0) THEN
	set res = "Email already Exists";
    return res;
end if;
if(username__>0) THEN
	set res = "Username already Exists";
end if;
if(nic__>0) THEN
	set res = "NIC already Exists";
end if;

if(branch__ =0) THEN
	set res = "Branch doesn't Exists";
end if;

return res;
    
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `depositOnlineLoantoFD` (`FDNumber_` VARCHAR(150), `amount_` DECIMAL(10,2)) RETURNS DECIMAL(10,2) NO SQL
BEGIN

	Declare newamount decimal(10,2);
    Declare oldamount decimal(10,2);
    
    select balance into oldamount from account where accountNum = (select accountNum from fixeddeposit where FDNumber = FDNumber_);
    set newamount = oldamount + amount_;
    
    return newamount;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getRemainingWithdrawal` (`accountNumber` VARCHAR(100)) RETURNS INT(11) NO SQL
begin

declare num int;

SELECT `withdrawlsRemaining` into num FROM `savingsaccount` WHERE accountNum = accountNumber;

return num;


end$$

CREATE DEFINER=`root`@`localhost` FUNCTION `savingAccountInterest` (`accountNum_` VARCHAR(100)) RETURNS INT(11) NO SQL
BEGIN

	DECLARE result decimal(10,2);
    declare customer int;
    declare interest_ decimal(10,2);
    declare amount_ decimal(10,2);
    
    select count(customerID) into customer from account where accountNum in (select accountNum from viewallsavingaccountsdetails where accountNum = accountNum_);
    if(customer<=0) THEN
    	set result = -1;
        return result;
    end IF;
    IF(customer>0) THEN
    	select balance into amount_ from viewallsavingaccountsdetails where accountNum = accountNum_;
        select interest into interest_ from viewallsavingaccountsdetails where accountNum = accountNum_;
        select interest_*amount_/100 into result;
        return result;
    end if;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accountNum` varchar(10) NOT NULL,
  `customerID` varchar(100) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `branchID` varchar(255) NOT NULL,
  `closed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accountNum`, `customerID`, `balance`, `branchID`, `closed`) VALUES
('07748765-0', '98d1f210-8', '0.00', '1', 0),
('0d40e644-f', '98d1f210-8', '0.00', '2', 0),
('1', 'b192b124-4', '100000.00', '1', 0),
('11582f45-9', '8116275a-c', '0.00', '1', 0),
('14681e95-5', 'a8f0ee6c-a', '44000.00', '2', 0),
('1c1b237b-4', '98d1f210-8', '0.00', '1', 0),
('1ef40eb6-7', '45880c14-a', '10154.30', '2', 0),
('1f925ffc-f', '98d1f210-8', '0.00', '2', 0),
('2', 'b192b124-4', '1214.19', '1', 0),
('22', '66b1811b-f', '101423.50', '1', 0),
('23', '66b1811b-f', '152.15', '1', 0),
('25', '66b1811b-f', '0.00', '1', 0),
('26', '66b1811b-f', '0.00', '1', 0),
('27', '66b1811b-f', '0.00', '1', 0),
('2877e9a8-e', 'a8f0ee6c-a', '0.00', '3', 0),
('288affa1-4', '45880c14-a', '203086.03', '2', 0),
('2d1faa74-d', '98d1f210-8', '0.00', '2', 0),
('2f41c323-8', '48557dc3-5b32-4982-9d4a-ebb0975376ad', '0.00', '2', 0),
('2ff2d2ee-c', '98d1f210-8', '0.00', '2', 0),
('3', 'b192b124-4', '-4846.00', '1', 0),
('39d80de0-f', '98d1f210-8', '0.00', '2', 0),
('3bd4adfb-e', '45880c14-a', '1011.90', '2', 0),
('4', 'b192b124-4', '30427.05', '1', 0),
('5', 'b192b124-4', '4.13', '1', 0),
('5328e043-1', '98d1f210-8', '0.00', '1', 0),
('5cbe2178-f', '48557dc3-5b32-4982-9d4a-ebb0975376ad', '0.00', '2', 0),
('6', 'b192b124-4', '888888.88', '1', 0),
('6b1bbc44-0', '98d1f210-8', '0.00', '1', 0),
('6ce0f12e-c', 'a8f0ee6c-a', '0.00', '2', 0),
('6dbb04b7-b', '45880c14-a', '202369.77', '2', 0),
('7', 'b192b124-4', '4000.12', '1', 0),
('70c57223-5', '98d1f210-8', '0.00', '2', 0),
('7246bace-b', '45880c14-a', '0.00', '2', 0),
('761bcc9c-1', '8116275a-c', '0.00', '1', 0),
('7c2eb52a-e', '98d1f210-8', '0.00', '2', 0),
('8', '45880c14-a', '222.00', '1', 0),
('806d7376-3', '98d1f210-8', '0.00', '1', 0),
('8854cc2a-9', '45880c14-a', '1011.90', '2', 0),
('9', '45880c14-a', '200000.00', '1', 0),
('90291d50-5', '98d1f210-8', '0.00', '1', 0),
('91b8b215-1', '0e9d215f-f646-4cef-8ec0-5e2a3625661a', '0.00', '2', 0),
('9bba5cd8-d', '98d1f210-8', '0.00', '2', 0),
('a6c903c0-3', '8116275a-c', '0.00', '1', 0),
('af57c39a-9', '98d1f210-8', '0.00', '1', 0),
('asqwesssax', 'a8f0ee6c-a', '0.00', '1', 0),
('b4ed18f3-f', '98d1f210-8', '0.00', '2', 0),
('b9589000-e', '98d1f210-8', '0.00', '2', 0),
('c2756e25-1', '98d1f210-8', '0.00', '2', 0),
('c6ff036d-d', '98d1f210-8', '0.00', '1', 0),
('c89ff408-3', '98d1f210-8', '0.00', '1', 0),
('c9b40683-8', '98d1f210-8', '0.00', '1', 0),
('d2cb9269-4', '98d1f210-8', '0.00', '2', 0),
('d820d84e-a', '45880c14-a', '506.45', '2', 0),
('d8c4e353-0', '98d1f210-8', '0.00', '1', 0),
('dc6ed29e-f', '45880c14-a', '0.00', '2', 0),
('e22b718c-e', '98d1f210-8', '0.00', '2', 0),
('e3a43b9d-b', '45880c14-a', '0.00', '2', 0),
('e68cb367-0', '45880c14-a', '0.00', '2', 0),
('ead25a9b-3', '98d1f210-8', '0.00', '2', 0),
('eb17d6ba-b', '98d1f210-8', '0.00', '2', 0),
('f0aa7e0f-7', '98d1f210-8', '0.00', '1', 0),
('f1088530-6', '98d1f210-8', '0.00', '2', 0),
('f386bc3e-8', 'a8f0ee6c-a', '0.00', '2', 0),
('fe8b829e-9', '98d1f210-8', '0.00', '1', 0),
('wertyuiop', '98d1f210-8', '0.00', '1', 0),
('wwwweere', '98d1f210-8', '0.00', '1', 0);

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
-- Stand-in structure for view `activeaccount`
-- (See below for the actual view)
--
CREATE TABLE `activeaccount` (
`accountNum` varchar(10)
,`customerID` varchar(100)
,`balance` decimal(10,2)
,`branchID` varchar(255)
);

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
-- Table structure for table `atm`
--

CREATE TABLE `atm` (
  `ATMID` varchar(10) NOT NULL,
  `cashReserve` decimal(10,2) DEFAULT NULL,
  `strretName` varchar(15) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `branchResponsible` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `atm`
--

INSERT INTO `atm` (`ATMID`, `cashReserve`, `strretName`, `city`, `branchResponsible`) VALUES
('1', '8839000.00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `atmwithdrawal`
--

CREATE TABLE `atmwithdrawal` (
  `receiptNum` varchar(10) NOT NULL,
  `ATMID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `atmwithdrawal`
--

INSERT INTO `atmwithdrawal` (`receiptNum`, `ATMID`) VALUES
('168c254f-8', '1'),
('20053ee2-c', '1'),
('25364242-7', '1'),
('9ef4d7dc-5', '1'),
('a19f8f6d-c', '1'),
('a73c42ad-5', '1'),
('sasdwdccsx', '1');

-- --------------------------------------------------------

--
-- Table structure for table `bankwithdrawl`
--

CREATE TABLE `bankwithdrawl` (
  `receiptNum` varchar(100) NOT NULL,
  `branchID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bankwithdrawl`
--

INSERT INTO `bankwithdrawl` (`receiptNum`, `branchID`) VALUES
('8463dd4c-4540-401e-a13d-c353819424c3', NULL),
('c0ace0a3-6e86-4fb0-804f-9ab0a1f4c9bb', NULL),
('07e6bd1d-18d1-49c1-ac02-b568f87d6447', '1'),
('09ab123b-6540-4fdb-9420-0eb73e3b7b7e', '1'),
('1b1063be-e71c-4f1d-bfaf-a9782463da47', '1'),
('1cdebe1d-a5b0-4dc4-ae96-0de04838ec62', '1'),
('226695ad-6388-4484-87e5-2b427cce9254', '1'),
('2469de40-535c-4004-8f86-8caf470f6289', '1'),
('28931760-3eb6-405f-a81d-812a7be1cc27', '1'),
('32323sdssafds', '1'),
('32df7922-8c1f-483d-957a-1a04bcd52804', '1'),
('33ff378e-41b5-4ddb-8dde-4922565e72c8', '1'),
('34d7262b-32e7-469d-b112-83b44adca29e', '1'),
('3e4edd67-2d87-4309-a600-c6f1b4f0d8b1', '1'),
('3e907dfd-e452-4333-9eac-90f09ebe5961', '1'),
('423d4a32-ac60-41fd-a0a2-01c0d84be507', '1'),
('468ee361-d78a-4a6a-b873-9e97e2bbda2a', '1'),
('50bbe1d2-67da-4ea4-88cc-99a7b11b1e88', '1'),
('57796705-dcfc-416e-a0f0-7e63eed9970b', '1'),
('59143c7d-4b6c-48f9-a9fb-694a87ab700d', '1'),
('711d6652-0ae5-4387-ab16-535fe443ae47', '1'),
('77ee9b84-3389-45c2-aae0-3272d73321b8', '1'),
('8cf4271f-f02e-4a3e-8abc-d79d8f87a67a', '1'),
('ba1c96bf-89e4-4315-833f-68f67403a107', '1'),
('c2ffca7c-7d9e-49aa-841c-1de4a42f3b33', '1'),
('dff454ae-4de3-4828-82e0-ebf8a4706410', '1'),
('e0c6ec1a-0f16-4d8f-b2da-485bd5aa6549', '1'),
('e15699c0-3ee7-4636-8485-c0bf724cbab7', '1'),
('e8dd43f6-5546-415d-8091-55ce4f55492c', '1'),
('ede90fde-3922-4fcc-b89d-8dc935f502b4', '1'),
('f31625d1-8e8b-4ff3-bbf5-38885bbdee21', '1'),
('qqaazzaaqq', '1'),
('06af6308-b3bf-4729-8313-27ac5c8a207b', '2'),
('1227848b-425e-4483-bf8f-2b30d571ee51', '2'),
('2613cbfe-9d96-45d3-a2bf-71217ab74b91', '2'),
('386ac9e6-f841-4944-bac0-d4dbdd714287', '2'),
('40c00aea-a9fd-4f5e-a74b-3049cac39605', '2'),
('48784b98-9421-451b-a669-2f68a255b76c', '2'),
('4caa3310-f9ec-49c5-857b-6b2ca400d504', '2'),
('5fd5605b-6cc8-4c9d-b174-4a95b188eecf', '2'),
('70aa3778-067c-4d31-a483-8de06fad105e', '2'),
('73d554ed-0911-4a6b-af60-2ea878e9358e', '2'),
('764c8acc-cf9e-40bf-9736-35ab91c83629', '2'),
('b438981c-6c13-46a0-846b-baa29c8348c9', '2'),
('b76d0417-699a-4ad8-b91e-8b7b795cd602', '2'),
('c18f59ae-491f-4403-b958-1b795b1d36bd', '2'),
('c5e35282-cc9a-4290-9860-bc7c66ad1f62', '2'),
('c89a040d-5a3c-401d-af45-97cf5c033576', '2'),
('cec25416-b0a7-4696-bcd0-9cfbad3cb4ab', '2'),
('d94f57a8-595b-4942-8d4a-d27704951ee9', '2'),
('ddfa694b-5564-45b1-a403-7acd9ed1a9d3', '2'),
('e7142b84-bb85-4519-b67d-a6dc6c47765f', '2');

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
('1', 'angoda', NULL, NULL, NULL, NULL),
('2', 'colombo', NULL, NULL, NULL, NULL),
('3', 'city', NULL, NULL, NULL, NULL);

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
('14681e95-5'),
('27'),
('2877e9a8-e'),
('5'),
('5cbe2178-f'),
('6'),
('6ce0f12e-c'),
('7'),
('761bcc9c-1'),
('8'),
('f386bc3e-8');

-- --------------------------------------------------------

--
-- Table structure for table `child`
--

CREATE TABLE `child` (
  `customerID` varchar(100) NOT NULL,
  `guardianID` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `child`
--

INSERT INTO `child` (`customerID`, `guardianID`) VALUES
('0e9d215f-f646-4cef-8ec0-5e2a3625661a', '9d3f655b-3');

-- --------------------------------------------------------

--
-- Table structure for table `childcustomer`
--

CREATE TABLE `childcustomer` (
  `customerID` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `guardingID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `childcustomer`
--

INSERT INTO `childcustomer` (`customerID`, `firstName`, `lastName`, `guardingID`) VALUES
('0e9d215f-f646-4cef-8ec0-5e2a3625661a', 'fnam1e', 'ln1ame', 'medan'),
('1e3b68b2-5207-408c-9f75-fc62b99cf5c3', 'fnam1e', 'ln1ame', 'medan'),
('251b526a-1154-464d-976e-73d651240dbe', 'fnam1e', 'ln1ame', 'medan'),
('a44e49f4-0582-4ee4-baa1-b1d45afbd847', 'fname', 'lname', 'child'),
('cdafb32c-8380-4fd0-8190-0fd39c422ebc', 'fnam1e', 'ln1ame', 'medan'),
('e72bb3b8-7115-4c40-9c37-93da4542983b', 'fnam1e', 'ln1ame', 'medan');

-- --------------------------------------------------------

--
-- Table structure for table `companycustomer`
--

CREATE TABLE `companycustomer` (
  `customerID` varchar(100) NOT NULL,
  `name` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companycustomer`
--

INSERT INTO `companycustomer` (`customerID`, `name`) VALUES
('06b825a6-b', 'up4'),
('125d57f3-8', 'panycusreg'),
('24f03325-0162-4d46-815a-95ecf128344f', 'cuspopocuspopocuspopocusp'),
('2e25389b-b962-450c-821d-daf08cf1c089', 'managerRegisteracomemploy'),
('424626e4-f', 'company'),
('8ea5c8ff-c420-46e6-8a90-0c1f177d438d', 'companywronghash'),
('9da9da53-476f-4545-b782-17b156a3773e', 'comcomcom'),
('a382076c-69ff-4a75-9476-e7c1e2d58735', 'lumindi'),
('a995c926-f', 'comcom'),
('b0620ab1-9', 'testprotest'),
('b192b124-4', 'WSO2'),
('pany', 'pany');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` varchar(100) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
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
('006fab9e-0ef6-4438-8de0-c605f44f1b02', 'aaaaaaxaaa', 'aaaaaaxaaa', 'aaaaaaxaaa', 'aaaaaaxaaa', 'aaaaaaxaaa', 'aaaaaaxaaa'),
('06b825a6-b', 'up7', 'up7', 'up4', 'up4', 'up4', 'up4'),
('0710b619-e6c3-4e96-a143-3c9354420e51', 'individualhashindividualhashindividualha', 'dsasdadsadindividualhashindividualhashindividualhashindividualhash', '', '', '', ''),
('0b2acfe9-7284-4c5b-863b-e22bd68afccc', '11111', 'q11', '', '', '', ''),
('0e9d215f-f646-4cef-8ec0-5e2a3625661a', 'NULL', 'us1erusernsme', 'medan', 'this.props.buil', 'this.props.streetName[0]', 'this.props.city[0]'),
('1', '', '', '', '', '', ''),
('125d57f3-8', 'panycusreg', 'panycusreg', 'panycusreg', 'panycusreg', 'panycusreg', 'panycusreg'),
('1e3b68b2-5207-408c-9f75-fc62b99cf5c3', NULL, 'us111111er11use1rnsme', 'medan', 'this.props.buil', 'this.props.streetName[0]', 'this.props.city[0]'),
('24f03325-0162-4d46-815a-95ecf128344f', 'cuspopocuspopocuspopocuspopocuspopocuspo', 'cuspopocuspopocuspopocuspopocuspopocuspopocuspopo', '', '', '', ''),
('251b526a-1154-464d-976e-73d651240dbe', NULL, 'us111111erusernsme', 'medan', 'this.props.buil', 'this.props.streetName[0]', 'this.props.city[0]'),
('2e25389b-b962-450c-821d-daf08cf1c089', 'managerRegisteracomemployeee', 'managerRegisteracomemployeee', '', '', '', ''),
('392063fe-01a9-42d9-9abd-1563b135a050', 'managerRegisteraindiemployeee', 'managerRegisteraindiemployeee', '', '', '', ''),
('424626e4-f', 'company', 'company', 'company', 'company', 'company', 'company'),
('45880c14-a', 'fdfdfdfd', '', '', '', '', ''),
('47a013c3-6a65-4f9c-aa70-301dace37fc2', 'cuspopocuspopocuspopo', 'cuspopocuspopocuspopo', '', '', '', ''),
('48557dc3-5b32-4982-9d4a-ebb0975376ad', 'sasindu', 'sasindu', 'sasindu', 'sasindu', 'sasindu', 'sasindu'),
('66b1811b-f', 'prerson', 'prerson', 'prerson', 'prerson', 'prerson', 'prerson'),
('7149327e-7c02-4856-9abb-a139c58f24ad', 'sasasasasindividualhash', 'asasas', '', '', '', ''),
('8116275a-c', 'individualcustomercus', 'individualcustomercus', 'individualcusto', 'individualcustomercus', 'individualcustomercus', 'individualcustomercus'),
('8ea5c8ff-c420-46e6-8a90-0c1f177d438d', 'companywronghash', 'companywronghash', '', '', '', ''),
('98d1f210-8', 'hellollollollollo', 'helloololol', 'azxcds', 'azxcds', 'azxcds', 'azxcds'),
('9d3f655b-3', 'updatedseconearly', 'updatedseconearly', 'updatedseconear', 'updatedseconearly', 'updatedseconearly', 'updatedseconearly'),
('9da9da53-476f-4545-b782-17b156a3773e', 'comcomcom', 'comcomcom', '1236547891123', '1', 'Street Name', 'Angoda'),
('a382076c-69ff-4a75-9476-e7c1e2d58735', 'lumindi', 'lumindi', '', '', '', ''),
('a44e49f4-0', 'nic', 'this.props.city[0]', 'NULL', 'medan', 'this.props.buildingNumber[0]', 'this.props.streetName[0]'),
('a8f0ee6c-a', 'azxcds', 'azxcds', 'azxcds', 'azxcds', 'azxcds', 'azxcds'),
('a995c926-f', 'comcom', 'comcom', 'comcom', 'comcom', 'comcom', 'comcom'),
('aa81a8c5-e', 'FirsFirstNameFirstNametName', 'FirstNameFirstNameFirstName', 'FirFirstNameFir', '', '', ''),
('b0620ab1-9', 'testprotest', 'testprotesttestprotest', 'testprotest', 'testprotest', 'testprotest', 'testprotest'),
('b192b124-4', 'dilsharasaaaaaaaaaaaaaaaaaaaaasindu@gmai', '170024R', '1236547891123', 'b', 'street', 'Angoda'),
('b824ed8b-c14e-439c-9b2f-227de7fa57e3', 'individualhash', 'individualhash', '', '', '', 'Angoda'),
('cdafb32c-8380-4fd0-8190-0fd39c422ebc', NULL, 'us111111er11usernsme', 'medan', 'this.props.buil', 'this.props.streetName[0]', 'this.props.city[0]'),
('e72bb3b8-7115-4c40-9c37-93da4542983b', NULL, 'MyuserChild', 'medan', 'this.props.buil', 'this.props.streetName[0]', 'this.props.city[0]'),
('fdc', 'fdc', 'fdc', '', '', '', 'fdc'),
('medan', 'medan', 'medan', 'medan', 'medan', 'medan', 'medan'),
('nowOnwards', 'aaa', '', '', '', '', ''),
('pany', 'pany', 'pany', 'pany', 'pany', 'pany', 'pany');

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
`receiptNum` varchar(255)
,`amount` decimal(10,2)
,`accountNum` varchar(10)
,`date_` varchar(255)
,`time_` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `depositreceipt`
--

CREATE TABLE `depositreceipt` (
  `receiptNum` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `depositreceipt`
--

INSERT INTO `depositreceipt` (`receiptNum`) VALUES
('sdswqdqwd211212312');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeID` varchar(100) NOT NULL,
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
('01b4e6e4-98d9-4c7f-ba54-6c93e24cd251', 'hashcheckhashch', 'hashchechashche', 'hashcheckhashcheck', 'hashchehashcheckck', 'hashc', 'hashcheckhashch', 'hashcheckhashch', 'hashcheckhashch', 'hashchechas', 'manager', '1222.00', '2'),
('04b58b92-c354-4f66-b9cd-049698f92380', 'wronghashwrongh', 'wronghash', 'wronghashwronghash', 'wronwronghashghash', 'wrong', 'wronghawronghas', 'wronwronghashgh', 'wronghwronghash', 'wronghashwr', 'manager', '0.00', '2'),
('07b4c977-7b8e-4b0d-a489-1008c19c5675', 'updatednikanemp', 'updatednikanemp', 'updatednikanemployee', 'updatednikanemployee', 'updat', 'req.body.update', 'req.body.update', 'updatednikanemp', NULL, 'accountant', '1000.00', '2'),
('0ce37e5b-3', 'employeemanager', 'employeemanager', 'employeemanager', 'employeemanager', 'emplo', 'employeemanager', 'employeemanager', 'employeemanager', 'employeeman', 'manager', '0.00', '1'),
('0d02cd47-25db-40cd-9123-16a8a18f5f8f', 'shammi', 'shammi', 'shammi', 'shammi', 'shamm', 'shammi', 'shammi', 'shammi', 'shammi', 'manager', '0.00', '1'),
('19619307-1', 'balee', 'updatedlee', 'updatedlee', 'updatedlee', 'updat', 'updatedlee', 'updatedlee', 'updatedlee', 'updatedlee', 'manager', '550.00', '1'),
('1cb9a6d1-7b9b-45da-bf11-eb0613fe6aa7', 'namernamernamer', 'namernamernamer', 'namernamernamer', 'namernamernamer', 'namer', 'namernamernamer', 'namernamernamer', 'namernamernamer', 'namernamern', 'manager', '0.00', '1'),
('1ebaa105-4a15-4909-860b-91192431cbe7', 'namer', '', 'namer', 'namer', '', '', '', '', '', 'manager', '0.00', '1'),
('3351d711-d19d-490d-a636-11f621567d2c', '112212121212', '', '112212121212', '112212121212', '', '', '', '', '', 'manager', '999999.99', '2'),
('3534bcf6-f546-46f5-a839-b235c536b1cd', 'nikanEmployee1', 'nikanEmployee1', 'nikanEmployee11111', 'nikanEmployee1111111', 'req.b', 'req.body.street', 'req.body.city', 'nikanEmployee', 'nikanEmploy', 'accountant', '1000.00', '2'),
('466590db-cd40-4ad8-8c40-57cd42fc4ed3', 'nikanEmployee', 'nikanEmployee', 'nikanEmployee', 'nikanEmployee', 'req.b', 'req.body.street', 'req.body.city', 'nikanEmployee', NULL, 'accountant', '1000.00', '2'),
('4f4ffe8a-d4ed-4db1-8324-347e2244b89f', 'managerRegister', 'managerRegister', 'managerRegisteraemployeee', 'managerRegisteraemployeee', '', '', '', '', 'managerRegi', 'manager', '10000.00', '2'),
('5ac6c6b4-1a79-4a00-b3f9-92155740fd28', 'sasiya', 'sasiya', 'sasiya', 'sasiysasiyaa', '', '', '', '', 'sasiyasasiy', 'manager', '1222.00', '1'),
('65cb8d25-11fd-4bc8-b6fe-13ba3a44a2d1', 'qwqwqasasdasd', 'qwqwqasasdasd', 'qwqwqasasdasd', 'qwqwqasasdasd', '', '', '', 'qwqwqasasdasd', 'qwqwqasasda', 'manager', '0.00', '2'),
('66a59db0-8c46-4155-abec-d1104490d3ba', '', '', 'mkmkmkjkjkj', 'mkmkmkjkjkj', '', '', '', '', '', 'manager', '0.00', '1'),
('724f6ac8-0213-4cf0-96c2-4910cb91a424', 'adacheck', 'adacheck', 'adacheck', 'adacheck', '', '', '', '', 'adacheck', 'manager', '111111.00', '1'),
('7437395e-9e72-4a32-ac57-2b4efbff1a0a', 'shammi2', 'shammi2', 'shammi2', 'shammi2', '', '', '', '', 'shammi2', 'manager', '0.00', '2'),
('79bc2c5e-968c-4a6c-9fd4-da2394dc3e74', '', '', 'xxxxxxxxx', 'ssassxxx', '', '', '', '', 'shammi', 'manager', '0.00', '1'),
('8e6d6b1a-b', 'employeer', 'employeer', 'employeer', 'employeer', 'emplo', 'employeer', 'employeer', 'employeer', 'employeer', 'manager', '0.00', '1'),
('93e53359-71f5-48ac-bbdc-c6ca92da1f49', 'anotherHashChec', 'anotherHashChec', 'anotherHashCheck', 'anotherHashCheck', '', '', '', 'anotherHashChec', 'anotherHash', 'manager', '0.00', '2'),
('a7b71973-0751-4e8c-81c0-25ebee397ad1', 'm12m3m1m2m3', '', 'm12m3m1m2m3', 'm12m3m1m2m3', '', '', '', '', '', 'manager', '10000.00', '1'),
('ad3e9c28-4adf-4659-8ae6-9f34b17fd4a8', 'wronghash', 'wronghash', 'wronghash', 'wronghash', 'wrong', 'wronghash', 'wronghash', 'wronghash', 'wronghash', 'manager', '23333.00', '2'),
('b1a734fc-9830-411d-b059-f5552c023ae9', 'hashcheck', 'hashcheck', 'hashcheck', 'hashcheck', 'hashc', 'hashcheck', 'hashcheck', 'hashcheck', 'hashcheck', 'manager', '0.00', '2'),
('bfadae08-e95c-4052-937c-811bbbec26f5', NULL, NULL, 'req.body.username', 'req.body.email', 'req.b', 'req.body.street', 'req.body.city', 'req.body.phoneN', NULL, 'accountant', '0.00', '2'),
('c89087df-022a-4d41-900d-7993c31e388d', 'bcrypthash', 'bcrypthash', 'bcrypthash', 'bcrypthash', '', '', '', '', 'bcrypthash', 'manager', '0.00', '2'),
('e631b434-0f29-42d8-a2f5-da0ebf3cf2ba', '', '', '11122211121323245434', '11122211121323245434', '', '', '', '', '', 'manager', '0.00', '2'),
('e95418bb-a7fd-471f-98a0-bc86eb341ac1', 'dannikangahuwe', 'dannikangahuwe', 'dannikangahuwe', 'dannikangahuwe', 'danni', 'dannikangahuwe', 'dannikangahuwe', 'dannikangahuwe', 'dannikangah', 'manager', '0.00', '2'),
('e9a22992-b683-4094-bbbb-d8947a0f7559', '10000', '10000', '10000', '10000', '', '', '', '10000', '10000', 'manager', '0.00', '2'),
('ec0fc708-f049-4f10-b8ef-f1fc11762f51', 'FirstNameFirstN', '', '4567890', 'FirstNameFirstNameFirstNameFirstNameFirs', '', '', '', '', '', 'manager', '999999.99', '2'),
('f0a823b6-3135-47d2-b406-3bdeadff70bd', 'cuspopocuspopoc', '', 'cuspopocuspopocuspopocuspopo', 'cuspopocuspopocuspopocuspopo', '', '', '', '', '', 'manager', '0.00', '2'),
('mamama', 'mamama', 'mamama', 'mamama', 'mamama', 'mamam', 'mamama', 'mamama', 'mamama', 'mamama', 'mamama', '0.00', '1');

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
-- Stand-in structure for view `fdaccountdetails`
-- (See below for the actual view)
--
CREATE TABLE `fdaccountdetails` (
`FDType` varchar(150)
,`FDNumber` varchar(10)
,`accountNum` varchar(10)
,`amount` decimal(11,2)
,`dateDeposited` varchar(20)
,`duration` int(11)
,`interest` decimal(4,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `fixeddeposit`
--

CREATE TABLE `fixeddeposit` (
  `FDNumber` varchar(10) NOT NULL,
  `accountNum` varchar(10) DEFAULT NULL,
  `amount` decimal(11,2) DEFAULT NULL,
  `dateDeposited` varchar(20) DEFAULT NULL,
  `FDType` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fixeddeposit`
--

INSERT INTO `fixeddeposit` (`FDNumber`, `accountNum`, `amount`, `dateDeposited`, `FDType`) VALUES
('2', '9', '102.00', '2019-12-16', 'A'),
('2b83defa-d', '9', '204.32', '2019-12-16', 'C'),
('3', '9', '306.48', '2019-12-16', 'B'),
('333', '9', '2.05', '2019-12-16', 'C'),
('3333', '22', '9.26', '2019-12-16', 'A'),
('456a9bbc-6', '9', '46.70', '2019-12-16', 'C'),
('5d02e6da-3', '9', '42017.90', NULL, 'C'),
('67268873-b', '22', '36.16', '2019-12-16', 'A'),
('728b2cc7-5', '22', '0.00', '2019-12-16', 'B'),
('8b9cc458-4', '9', '46.70', NULL, 'C'),
('8c374e7f-5', '9', '36307.96', '2019-12-16', 'A'),
('96b43baf-5', '9', '42.18', '2019-12-16', 'C'),
('d12a2614-2', '22', '0.00', '2019-12-16', 'C'),
('d4e9715a-6', '9', '0.07', '2019-12-16', 'C'),
('e487e6cc-4', '9', '5186.36', '2019-12-16', 'C'),
('e50fb9b2-0', '9', '386.01', NULL, 'C'),
('f603148e-2', '9', '46.70', NULL, 'C'),
('fcab1351-c', '22', '5091.63', '2019-12-16', 'A'),
('sadffr45rr', '9', '4.99', '2019-12-16', 'B');

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

-- --------------------------------------------------------

--
-- Stand-in structure for view `getalldataofcompanycustomer`
-- (See below for the actual view)
--
CREATE TABLE `getalldataofcompanycustomer` (
`customerID` varchar(100)
,`username` varchar(100)
,`password` varchar(5000)
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
`customerID` varchar(100)
,`username` varchar(100)
,`password` varchar(5000)
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
`employeeID` varchar(100)
,`username` varchar(100)
,`password` varchar(5000)
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
  `customerID` varchar(100) NOT NULL,
  `firstName` varchar(15) DEFAULT NULL,
  `lastName` varchar(15) DEFAULT NULL,
  `NIC` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `individualcustomer`
--

INSERT INTO `individualcustomer` (`customerID`, `firstName`, `lastName`, `NIC`) VALUES
('006fab9e-0ef6-4438-8de0-c605f44f1b02', NULL, NULL, NULL),
('0710b619-e6c3-4e96-a143-3c9354420e51', NULL, NULL, NULL),
('0b2acfe9-7284-4c5b-863b-e22bd68afccc', NULL, NULL, NULL),
('392063fe-01a9-42d9-9abd-1563b135a050', NULL, NULL, NULL),
('45880c14-a', 'dsdsd', 'dsdsds', 'dsdsdsd'),
('47a013c3-6a65-4f9c-aa70-301dace37fc2', NULL, NULL, NULL),
('48557dc3-5b32-4982-9d4a-ebb0975376ad', NULL, NULL, NULL),
('66b1811b-f', 'prerson', 'prerson', 'prerson'),
('7149327e-7c02-4856-9abb-a139c58f24ad', NULL, NULL, NULL),
('8116275a-c', 'individualcusto', 'individualcusto', 'individualcusto'),
('98d1f210-8', 'hello', 'hello', 'hello'),
('9d3f655b-3', 'updatedseconear', 'updatedseconear', 'updatedseconear'),
('a8f0ee6c-a', NULL, NULL, 'jhjh'),
('aa81a8c5-e', NULL, NULL, 'nbnbnb'),
('b824ed8b-c14e-439c-9b2f-227de7fa57e3', NULL, NULL, 'individualhash'),
('fdc', '', '', 'nbnnbn'),
('medan', 'medan', 'medan', 'medan'),
('nowOnwards', 'ssss', '', 'bnbnb');

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
('1234', '45880c14-a', '100.00', '0000-00-00', '5.00', 8),
('15', '66b1811b-f', '20500.00', '0000-00-00', '100.00', 5),
('16', '66b1811b-f', '10000.00', '0000-00-00', '100.00', 5),
('7336b980-3', '45880c14-a', '1.00', NULL, '100.00', 5),
('83f8a67c-9', '45880c14-a', '6000.00', NULL, '1000.00', 3),
('ba77e160-1', '45880c14-a', '1000.00', NULL, '100.00', 5),
('bccb9309-5', '66b1811b-f', '60000.00', NULL, '1000.00', 3),
('dc5abe64-b', '66b1811b-f', '66.00', NULL, '500.00', 5),
('dfe022de-3', '45880c14-a', '1.00', NULL, '100.00', 5),
('e489c7dc-9', '1', '0.00', NULL, '500.00', 5),
('f57c3c10-0', '66b1811b-f', '50000.00', NULL, '500.00', 5),
('fee0ae6d-6', '66b1811b-f', '50000.00', NULL, '500.00', 5),
('FIFTHTRY', '45880c14-a', '8000.00', '0000-00-00', '111.00', 2),
('FIRSTONLIN', '45880c14-a', '6000.00', '0000-00-00', '1000.00', 5),
('SECONDTRY', '45880c14-a', '6000.00', '0000-00-00', '1000.00', 0),
('SIXTH', '66b1811b-f', '100000.00', '0000-00-00', '3.00', 0),
('ThirdTRY', '45880c14-a', '6000.00', '0000-00-00', '112.00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `loanrequest`
--

CREATE TABLE `loanrequest` (
  `requestID` varchar(10) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date_` date DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `loanOfficerID` varchar(10) DEFAULT NULL,
  `approvedBy` varchar(100) DEFAULT NULL,
  `branchID` varchar(10) DEFAULT NULL,
  `customerID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `loanrequest`
--

INSERT INTO `loanrequest` (`requestID`, `description`, `amount`, `date_`, `approved`, `loanOfficerID`, `approvedBy`, `branchID`, `customerID`) VALUES
('1', NULL, '0.00', NULL, NULL, NULL, NULL, NULL, NULL),
('19d90dbc-8', 'req.body.details.description', '50000.00', '0000-00-00', 1, '7f177d91-c', 'mamama', '1', '66b1811b-f'),
('2', '222', '0.00', NULL, NULL, NULL, NULL, NULL, NULL),
('2b2b0511-2', 'description', '0.00', '0000-00-00', 1, '7f177d91-c', 'mamama', '1', '1'),
('3', NULL, '0.00', NULL, NULL, NULL, NULL, NULL, NULL),
('3f731fed-4', 'need for a loan', '400.00', '0000-00-00', 0, '19619307-1', '7f177d91-c', '1', '66b1811b-f'),
('4535a94b-4', 'need for a loan', '400.00', '0000-00-00', 0, '19619307-1', '7f177d91-c', '1', '66b1811b-f'),
('8ed46ddb-1', 'description', '0.00', '0000-00-00', 0, '7f177d91-c', '7f177d91-c', '1', '1'),
('b4b7ad53-0', 'need hurry a loan', '400.00', NULL, 0, '19619307-1', '7f177d91-c', '1', '66b1811b-f'),
('d34729dd-5', 'need for a loan', '400.00', NULL, 0, '19619307-1', '7f177d91-c', '1', '66b1811b-f'),
('f2fd8c16-2', 'description', '0.00', '0000-00-00', 0, '7f177d91-c', '7f177d91-c', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(100) NOT NULL,
  `password` varchar(5000) DEFAULT NULL,
  `accessType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`, `accessType`) VALUES
('', '', ''),
('10000', '$2a$10$.jrfjjqK0uW/Ce/dQfz4QuaxL8ZmtOryezdLdawva6N', 'manager'),
('11122211121323245434', '$2a$10$oYr2R84PKZeeI37Rk3rU..PXR3SwESck71460UzUZ.h', 'manager'),
('112212121212', '$2a$10$84of7zyalr1adZYRbVaVaeOn0TFdmMSNZ2uZTDWV/ZT', 'manager'),
('170024R', '170024R', 'company'),
('4567890', '$2a$10$2KyVTfqKwqyaLkAGI5cu9.mr5wjFj2ykYKGOskVSqMh', 'manager'),
('a', 'a', 'individual'),
('aaaaaaxaaa', '$2a$10$8uxDSJWZz.2OH4ryUBN/M.1ifxlPyyN9gL04yi2Wi05Gw/xAnlrwG', 'individual'),
('adacheck', 'adacheck', 'manager'),
('anotherHashCheck', '$2a$10$Z1IuQ7ZswipP5qayJeEmju2AHxvfHC/SLor3B6teQ.g', 'manager'),
('asasas', '$2a$10$ap/1Rddzk0kH/aYSsVBa8ujM1bTAcMYUbufXn2eqPkpvEoKW36z/2', 'individual'),
('azxcds', 'azxcds', 'individual'),
('bcrypthash', '$2a$10$XBh/YmF0F/BqfiD51E.jzuYNnDx2u.pZ2IEvXxrTimz', 'manager'),
('comcom', 'comcom', 'company'),
('comcomcom', '$2a$10$LyQeR4hnpW9MXbwDddXS/.W.D/sP5KA9GbTmzpH8kawCoaMy2aGAq', 'company'),
('company', 'company', 'company'),
('companywronghash', 'companywronghash', 'company'),
('cuspopocuspopocuspopo', 'cuspopocuspopocuspopo', 'individual'),
('cuspopocuspopocuspopocuspopo', 'cuspopocuspopocuspopocuspopo', 'manager'),
('cuspopocuspopocuspopocuspopocuspopocuspopocuspopo', 'cuspopocuspopocuspopocuspopocu', 'company'),
('dannikangahuwe', 'dannikangahuwe', 'manager'),
('dsasdadsadindividualhashindividualhashindividualhashindividualhash', '$2a$10$KsRA3BUGgsJtt.2Fn4uQQuAZInQgaXz3P9CiI7b73x22nucWl8fSq', 'individual'),
('employeema', 'employeemanager', 'manager'),
('employeer', 'employeer', 'manager'),
('fdc', '', ''),
('FirstNameFirstNameFirstName', 'FirstNameFirstNameFirstName', 'individual'),
('hashcheck', 'hashcheck', 'manager'),
('hashcheckhashcheck', '$2a$10$.xTCDewOvGKh0Cw1dORzHOzeRztw.tvN0KETw9e3P2S', 'manager'),
('helloololol', 'azxcds', 'individual'),
('individualcustomercus', 'individualcustomercus', 'individual'),
('individualhash', 'individualhash', 'individual'),
('lumindi', '$2a$10$nzpjBCmifSoGIn72q64BGemUY9YEnoMjEEz8YNVwyBEn66z1JLxAW', 'company'),
('m12m3m1m2m3', '$2a$10$L..eTgMsflmosH1Xw3cUWu.ZSbb7qiuJ5gfSm/0axZKGqPXlA.OvS', 'manager'),
('mamama', 'mamama', 'mamama'),
('managerRegisteracomemployeee', '$2a$10$V3dL.NSGoydPmXV1lskFNOYa8v/0900VlZHTwCZDLHoazdCRmjh/m', 'company'),
('managerRegisteraemployeee', '$2a$10$4vvrTfJ65puac4bOHER2Gukr71VyHklkOwuDEgltb8cMnyjn3k1bm', 'other'),
('managerRegisteraindiemployeee', '$2a$10$vuAaj73vfZIFU1ncyUHU9elSnyop3KQlwj7uZhBzZUF9sbg9xIeFu', 'individual'),
('medan', 'medan', 'medan'),
('mkmkmkjkjkj', '$2a$10$vnhcPibbFxQSfFDoPWqa0uc.JrNHCUtdnJTMZdQTYda', 'manager'),
('mmmm', 'mmmm', 'manager'),
('MyuserChild', 'MyuserChild', 'Child'),
('namer', '', 'manager'),
('namernamernamer', 'namernamernamer', 'manager'),
('nikanEmployee', 'nikanEmployee', 'accountant'),
('nikanEmployee11111', 'nikanEmployee1', 'accountant'),
('pany', 'pany', 'pany'),
('panycusreg', 'panycusreg', 'company'),
('prerson', 'prerson', 'individual'),
('q11', '$2a$10$HqKJDYijYHdJiyehY2NktOh5OdxqQBTJnyviAlPxH5SnuHQC0K3P2', 'individual'),
('qwqwqasasdasd', '$2a$10$NymtDDnycoi.BDrUHYvdEuaM6jxR1OtbbndIJPoGbRk12KsKbZD3K', 'manager'),
('req.body.username', 'req.body.password', 'accountant'),
('sasindu', '$2a$10$roAooAjjYl1CgR9Y0b1ng.Nd0ARZhcYOs/ygVQFORB2FgMOwOgqRi', 'individual'),
('shammi', '$2a$10$6c8EEv/fK8l30Xj/bSgs5eA2.RlVMC06wN8U1xuMbdDP6dUJDQUji', 'manager'),
('shammi2', '$2a$10$qGfe1nL3AwbeRH2K0K6tMuxIv/jJXSTld6hyMoOG/jhXNO/b20Wey', 'other'),
('testprotesttestprotest', 'testprotest', 'company'),
('this.props.city[0]', 'userusernsme', 'userusernsme'),
('up7', 'updatedThirdly', 'company'),
('updatedlee', 'updatedlee', 'manager'),
('updatednikanemployee', 'updatednikanemployee', 'manager'),
('updatedseconearly', 'updatedseconearly', 'individual'),
('us111111er11use1rnsme', 'us1erusernsme', 'child'),
('us111111er11usernsme', 'us1erusernsme', 'child'),
('us111111erusernsme', 'us1erusernsme', 'child'),
('us1erusernsme', 'us1erusernsme', 'child'),
('wronghash', 'wronghash', 'manager'),
('wronghashwronghash', 'wronghashwronghash', 'manager'),
('xxxxxxxxx', '$2a$10$99aF0pOBUXlO2nlW91zhtuGsw9p9bpKZhzIfEjrdw0eB92gZ97fxG', 'individual');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `employeeID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`employeeID`) VALUES
('01b4e6e4-98d9-4c7f-ba54-6c93e24cd251'),
('04b58b92-c354-4f66-b9cd-049698f92380'),
('07b4c977-7b8e-4b0d-a489-1008c19c5675'),
('0ce37e5b-3'),
('0d02cd47-25db-40cd-9123-16a8a18f5f8f'),
('19619307-1'),
('1cb9a6d1-7b9b-45da-bf11-eb0613fe6aa7'),
('1ebaa105-4a15-4909-860b-91192431cbe7'),
('3351d711-d19d-490d-a636-11f621567d2c'),
('4f4ffe8a-d4ed-4db1-8324-347e2244b89f'),
('537738af-2'),
('5ac6c6b4-1a79-4a00-b3f9-92155740fd28'),
('65cb8d25-11fd-4bc8-b6fe-13ba3a44a2d1'),
('66a59db0-8c46-4155-abec-d1104490d3ba'),
('724f6ac8-0213-4cf0-96c2-4910cb91a424'),
('7437395e-9e72-4a32-ac57-2b4efbff1a0a'),
('79bc2c5e-968c-4a6c-9fd4-da2394dc3e74'),
('7f177d91-c'),
('8e6d6b1a-b'),
('93e53359-71f5-48ac-bbdc-c6ca92da1f49'),
('a0907b56-5cec-46de-b241-00af6bd7f34e'),
('a7b71973-0751-4e8c-81c0-25ebee397ad1'),
('ad3e9c28-4adf-4659-8ae6-9f34b17fd4a8'),
('b1a734fc-9830-411d-b059-f5552c023ae9'),
('c89087df-022a-4d41-900d-7993c31e388d'),
('e631b434-0f29-42d8-a2f5-da0ebf3cf2ba'),
('e95418bb-a7fd-471f-98a0-bc86eb341ac1'),
('e9a22992-b683-4094-bbbb-d8947a0f7559'),
('ec0fc708-f049-4f10-b8ef-f1fc11762f51'),
('f0a823b6-3135-47d2-b406-3bdeadff70bd'),
('mamama');

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
('11111', '1234', NULL, NULL, NULL),
('11121', '1234', NULL, NULL, NULL),
('2', '1', NULL, NULL, NULL),
('2155b356-e0df-4', '1234', 'jan', '1997', '0000-00-00'),
('3', '1', NULL, NULL, NULL),
('313deeb7-3758-4', 'f57c3c10-0', '5', '6', NULL),
('4', '1', NULL, NULL, NULL),
('962bf374-205e-4', '1234', 'jan', '1997', '0000-00-00');

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
('1', '1'),
('16', '1'),
('dc5abe64-b', '19d90dbc-8'),
('f57c3c10-0', '19d90dbc-8'),
('fee0ae6d-6', '19d90dbc-8'),
('e489c7dc-9', '2b2b0511-2');

-- --------------------------------------------------------

--
-- Table structure for table `onlineloan`
--

CREATE TABLE `onlineloan` (
  `loanNum` varchar(100) NOT NULL,
  `FDNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `onlineloan`
--

INSERT INTO `onlineloan` (`loanNum`, `FDNumber`) VALUES
('1234', '2'),
('15', '2'),
('7336b980-3', '2'),
('83f8a67c-9', '2'),
('ba77e160-1', '2'),
('dfe022de-3', '2'),
('FIFTHTRY', '333'),
('FIRSTONLIN', '333'),
('SECONDTRY', '333'),
('ThirdTRY', '333'),
('SIXTH', '3333'),
('bccb9309-5', '67268873-b');

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `receiptNum` varchar(255) NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `accountNum` varchar(10) DEFAULT NULL,
  `date_` varchar(255) DEFAULT NULL,
  `time_` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`receiptNum`, `amount`, `accountNum`, `date_`, `time_`) VALUES
('32323sdssafds', '100.00', '9', '0000-00-00', '00:00:00'),
('dasdasdadsqrf4', '10000.00', '9', '0000-00-00', '00:00:00'),
('nowshouldbecorrect', '1.00', '9', '0000-00-00', '00:00:00'),
('sdswqdqwd211212312', '10000.00', '9', '0000-00-00', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `receiptNum` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `accountNum` varchar(255) NOT NULL,
  `date_` varchar(30) NOT NULL,
  `time_` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `receivingAccountID` varchar(150) DEFAULT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`receiptNum`, `amount`, `accountNum`, `date_`, `time_`, `receivingAccountID`, `type`) VALUES
('', '0.00', '', '', '0000-00-00 00:00:00.000000', NULL, '');

--
-- Triggers `reports`
--
DELIMITER $$
CREATE TRIGGER `after_insert_receipt` AFTER INSERT ON `reports` FOR EACH ROW BEGIN
    
    INSERT INTO `reports` (`receiptNum`, `amount`, `accountNum`, `date_`, `time_`, `receivingAccountID`, `type`) VALUES (new.receiptNum,new.amount,new.accountNum,new.date_,new.time_,null,'');
    
    end
$$
DELIMITER ;

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
('07748765-0', 10, 'Child'),
('0d40e644-f', 10, 'Child'),
('11582f45-9', 10, 'Child'),
('1c1b237b-4', 10, 'Child'),
('1ef40eb6-7', 10, 'Senior'),
('1f925ffc-f', 5, 'Teen'),
('2', 10, 'Adult'),
('22', 10, 'Child'),
('23', 10, 'Child'),
('25', 10, 'Child'),
('26', 10, 'Child'),
('288affa1-4', 10, 'Senior'),
('2d1faa74-d', 5, 'Child'),
('2ff2d2ee-c', 10, 'Senior'),
('3', 10, 'Child'),
('39d80de0-f', 10, 'Senior'),
('3bd4adfb-e', 10, 'Adult'),
('4', 10, 'Child'),
('5328e043-1', 10, 'Child'),
('6b1bbc44-0', 10, 'Child'),
('6dbb04b7-b', 10, 'Adult'),
('70c57223-5', 10, 'Adult'),
('7246bace-b', 10, 'Teen'),
('7c2eb52a-e', 5, 'Senior'),
('806d7376-3', 10, 'Child'),
('8854cc2a-9', 10, 'Adult'),
('9', 9, 'Child'),
('90291d50-5', 10, 'Child'),
('91b8b215-1', 5, 'Child'),
('9bba5cd8-d', 10, 'Child'),
('a6c903c0-3', 10, 'Child'),
('af57c39a-9', 10, 'Child'),
('asqwesssax', 10, 'Child'),
('b4ed18f3-f', 5, 'Child'),
('b9589000-e', 10, 'Child'),
('c2756e25-1', 5, 'Adult'),
('c6ff036d-d', 10, 'Child'),
('c89ff408-3', 10, 'Child'),
('c9b40683-8', 10, 'Child'),
('d2cb9269-4', 5, 'Child'),
('d820d84e-a', 10, 'Teen'),
('d8c4e353-0', 10, 'Child'),
('dc6ed29e-f', 10, 'Senior'),
('e22b718c-e', 5, 'Child'),
('e3a43b9d-b', 10, 'Adult'),
('e68cb367-0', 10, 'Teen'),
('ead25a9b-3', 10, 'Adult'),
('eb17d6ba-b', 10, 'Child'),
('f0aa7e0f-7', 10, 'Child'),
('f1088530-6', 5, 'Child'),
('fe8b829e-9', 10, 'Child'),
('wertyuiop', 10, 'Child'),
('wwwweere', 10, 'Child');

-- --------------------------------------------------------

--
-- Table structure for table `transferreceipt`
--

CREATE TABLE `transferreceipt` (
  `receiptNum` varchar(255) NOT NULL,
  `receivingAccountID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transferreceipt`
--

INSERT INTO `transferreceipt` (`receiptNum`, `receivingAccountID`) VALUES
('dasdasdadsqrf4', '1'),
('nowshouldbecorrect', '1');

-- --------------------------------------------------------

--
-- Stand-in structure for view `transferreceipts`
-- (See below for the actual view)
--
CREATE TABLE `transferreceipts` (
`receiptNum` varchar(255)
,`amount` decimal(10,2)
,`accountNum` varchar(10)
,`date_` varchar(255)
,`time_` varchar(255)
,`receivingAccountID` varchar(10)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewallsavingaccountsdetails`
-- (See below for the actual view)
--
CREATE TABLE `viewallsavingaccountsdetails` (
`accountType` varchar(10)
,`accountNum` varchar(10)
,`withdrawlsRemaining` int(11)
,`customerID` varchar(100)
,`balance` decimal(10,2)
,`branchID` varchar(255)
,`closed` tinyint(1)
,`minimumAmount` decimal(6,2)
,`interest` decimal(4,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `withdrawalreceipt`
--

CREATE TABLE `withdrawalreceipt` (
  `receiptNum` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `withdrawalreceipt`
--

INSERT INTO `withdrawalreceipt` (`receiptNum`) VALUES
('32323sdssafds');

-- --------------------------------------------------------

--
-- Structure for view `activeaccount`
--
DROP TABLE IF EXISTS `activeaccount`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `activeaccount`  AS  select `account`.`accountNum` AS `accountNum`,`account`.`customerID` AS `customerID`,`account`.`balance` AS `balance`,`account`.`branchID` AS `branchID` from `account` where (`account`.`closed` = 0) ;

-- --------------------------------------------------------

--
-- Structure for view `allcheckingaccountofacustomer`
--
DROP TABLE IF EXISTS `allcheckingaccountofacustomer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `allcheckingaccountofacustomer`  AS  select `account`.`accountNum` AS `accountNum`,`account`.`customerID` AS `customerID`,`account`.`balance` AS `balance` from (`account` join `checkingaccount` on((`account`.`accountNum` = `checkingaccount`.`accountNum`))) ;

-- --------------------------------------------------------

--
-- Structure for view `depositereceipts`
--
DROP TABLE IF EXISTS `depositereceipts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `depositereceipts`  AS  select `receipt`.`receiptNum` AS `receiptNum`,`receipt`.`amount` AS `amount`,`receipt`.`accountNum` AS `accountNum`,`receipt`.`date_` AS `date_`,`receipt`.`time_` AS `time_` from (`receipt` join `withdrawalreceipt` on((`receipt`.`receiptNum` = `withdrawalreceipt`.`receiptNum`))) ;

-- --------------------------------------------------------

--
-- Structure for view `fdaccountdetails`
--
DROP TABLE IF EXISTS `fdaccountdetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `fdaccountdetails`  AS  select `fixeddeposit`.`FDType` AS `FDType`,`fixeddeposit`.`FDNumber` AS `FDNumber`,`fixeddeposit`.`accountNum` AS `accountNum`,`fixeddeposit`.`amount` AS `amount`,`fixeddeposit`.`dateDeposited` AS `dateDeposited`,`fixeddeposittype`.`duration` AS `duration`,`fixeddeposittype`.`interest` AS `interest` from (`fixeddeposit` join `fixeddeposittype` on((`fixeddeposit`.`FDType` = `fixeddeposittype`.`FDType`))) ;

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

-- --------------------------------------------------------

--
-- Structure for view `viewallsavingaccountsdetails`
--
DROP TABLE IF EXISTS `viewallsavingaccountsdetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewallsavingaccountsdetails`  AS  select `savingsaccount`.`accountType` AS `accountType`,`savingsaccount`.`accountNum` AS `accountNum`,`savingsaccount`.`withdrawlsRemaining` AS `withdrawlsRemaining`,`account`.`customerID` AS `customerID`,`account`.`balance` AS `balance`,`account`.`branchID` AS `branchID`,`account`.`closed` AS `closed`,`accounttype`.`minimumAmount` AS `minimumAmount`,`accounttype`.`interest` AS `interest` from ((`savingsaccount` join `account` on((`savingsaccount`.`accountNum` = `account`.`accountNum`))) join `accounttype` on((`savingsaccount`.`accountType` = `accounttype`.`accountType`))) ;

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
  ADD KEY `guardianID` (`guardianID`),
  ADD KEY `customerID` (`customerID`) USING BTREE;

--
-- Indexes for table `childcustomer`
--
ALTER TABLE `childcustomer`
  ADD PRIMARY KEY (`customerID`);

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
  ADD KEY `accountNum` (`accountNum`),
  ADD KEY `FDType` (`FDType`);

--
-- Indexes for table `fixeddeposittype`
--
ALTER TABLE `fixeddeposittype`
  ADD PRIMARY KEY (`FDType`);

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
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`receiptNum`);

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
  ADD CONSTRAINT `child_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `childcustomer` (`customerID`);

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
  ADD CONSTRAINT `fixeddeposit_ibfk_1` FOREIGN KEY (`accountNum`) REFERENCES `savingsaccount` (`accountNum`),
  ADD CONSTRAINT `fixeddeposit_ibfk_2` FOREIGN KEY (`FDType`) REFERENCES `fixeddeposittype` (`FDType`);

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

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `Upload_FD_Interest` ON SCHEDULE EVERY 1 DAY STARTS '2019-12-18 00:57:18' ON COMPLETION NOT PRESERVE ENABLE DO update fdaccountdetails set amount = amount+amount*interest/36500$$

CREATE DEFINER=`root`@`localhost` EVENT `Upload_Saving_Interest` ON SCHEDULE EVERY 1 DAY STARTS '2019-12-18 01:18:34' ON COMPLETION NOT PRESERVE ENABLE DO update viewallsavingaccountsdetails set balance = balance+balance*interest/36500$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
