--getReceiverID function
DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `getReceiverID`(`receiptNo` VARCHAR(100)) RETURNS varchar(100) CHARSET utf8
    NO SQL
BEGIN

DECLARE transCount int;
DECLARE receiverID varchar(100);

select count(receiptNum) into transCount from transferreceipt where receiptNum=receiptNo;
   

 IF(transCount=1) THEN
 	SELECT receivingAccountID into receiverID from transferreceipt WHERE receiptNum=receiptNo;
    RETURN receiverID;
    
 ELSE
 	return '';	
 END IF;
   
END$$
DELIMITER ;

--checkTransactionType function
DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `checkTransactionType`(`receiptNo` VARCHAR(100)) RETURNS varchar(10) CHARSET utf32
    NO SQL
BEGIN

DECLARE transCount int;
DECLARE depCount int;
DECLARE withdCount int;
DECLARE type varchar(10);

select count(receiptNum) into transCount from transferreceipt where receiptNum=receiptNo;
select count(receiptNum) into depCount from depositreceipt where receiptNum=receiptNo;
select count(receiptNum) into withdCount from withdrawalreceipt where receiptNum=receiptNo;
   

 IF(transCount>0) THEN
 	SET type = 'Transfer';
	RETURN type;
   END IF;
 IF(depCount>0) THEN
 	SET type = 'Deposite';
    RETURN type;
   END IF;
 IF(withdCount>0) THEN
 	SET type = 'Withdraw';
   	RETURN type;
   END IF;
          

END$$
DELIMITER ;

--new checkType function
DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `check_`(`receiptNo` VARCHAR(100)) RETURNS varchar(100) CHARSET latin1
    NO SQL
BEGIN

DECLARE transCount int;
DECLARE depCount int;
DECLARE withdCount int;
DECLARE type varchar(10);

select count(receiptNum) into transCount from transferreceipt where receiptNum=receiptNo;
select count(receiptNum) into depCount from depositreceipt where receiptNum=receiptNo;
select count(receiptNum) into withdCount from withdrawalreceipt where receiptNum=receiptNo;
   

 IF(transCount>0) THEN
 	SET type = 'Transfer';
	RETURN type;
   END IF;
 IF(depCount>0) THEN
 	SET type = 'Deposite';
    RETURN type;
   END IF;
 IF(withdCount>0) THEN
 	SET type = 'Withdraw';
   	RETURN type;
   END IF;
          

END$$
DELIMITER ;

--viewReports procedure
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `viewReports`(IN `year` VARCHAR(10), IN `month` VARCHAR(10), IN `date` VARCHAR(10))
    NO SQL
BEGIN

SELECT 
     CONCAT("[",
          GROUP_CONCAT(
               CONCAT("{Receipt Number:'",receiptNum,"'"),
               CONCAT("Amount:'",amount,"'"),
               CONCAT("Account Number:'",accountNum,"'"),
               (SELECT check_(receiptNum)),
               CONCAT("Date:'",date_,"'"),
               CONCAT(",Time:'",time_),"'}"),"]") FROM receipt;

END$$
DELIMITER ;