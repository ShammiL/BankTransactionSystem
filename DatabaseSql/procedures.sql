-- individual customer registeration

DELIMITER //
create procedure individualcustomerLogin(customerID varchar(40),firstname varchar(50),lastname varchar(50),NIC varchar(50),email varchar(50),phoneNumber varchar(15),buildingNumber varchar(50),streetName varchar(50),city varchar(50),nameuser varchar(50),pass varchar(10))
BEGIN
set AUTOCOMMIT = 0;
	insert into customer(customerID,email,phoneNumber,buildingNumber,streetName,city) values(customerIDnumber,email,phoneNumber,buildingNumber,streetName,city);
    insert into individualcustomer(customerID,firstName,lastName,NIC) values(customerIDnumber,firstName,lastName,NIC);
    insert into login(username,password) values(nameuser,pass);
    commit;
end//
DELIMITER ;


-- call individualcustomerLogin('customerID','firstname','lastname','NIC','email','phoneNumber','buildingNumber','streetName','city')

-- company customer register

DELIMITER //
create procedure individualcustomerLogin(customerID varchar(40),companyName varchar(50),email varchar(50),phoneNumber varchar(15),buildingNumber varchar(50),streetName varchar(50),city varchar(50),nameuser varchar(50),pass varchar(10))
BEGIN
set AUTOCOMMIT = 0;
	insert into customer(customerID,email,phoneNumber,buildingNumber,streetName,city) values(customerIDnumber,email,phoneNumber,buildingNumber,streetName,city);
    insert into companycustomer(customerID,name) values(customerIDnumber,companyName);
    insert into login(username,password) values(nameuser,pass);
    commit;
end//
DELIMITER ;

-- call companycustomerLogin('customerIDnumber varchar(40)','companyName varchar(50)','email varchar(50)','phoneNumber varchar(15)','buildingNumber varchar(50)','streetName varchar(50)','city varchar(50)','nameuser varchar(50)','pass varchar(10)')

-- manager reg
DELIMITER //
create procedure managerRegister(employeeIDnum varchar(40),firstName varchar(50),lastName varchar(50),nic varchar(11),email varchar(50),phoneNumber varchar(15),buildingNumber varchar(50),streetName varchar(50),city varchar(50),salary varchar(10),designation varchar(50),branchID varchar(10),nameuser varchar(50),pass varchar(10))
BEGIN
set AUTOCOMMIT = 0;
	insert into employee(employeeID,firstName,lastName,email,buildingNumber,streetName,city,phoneNumber,NIC,designation,salary,branchID) values(employeeIDnum,firstName,lastName,email,buildingNumber,streetName,city,phoneNumber,designation,salary,branchID);
    insert into manager(employeeID) values(employeeIDnum);
    insert into login(username,password) values(nameuser,pass);
    commit;
end//
DELIMITER ;

-- call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')


BEGIN
set AUTOCOMMIT = 0;
    DELETE FROM individualcustomer where customerID = customerIDnumber;
    DELETE FROM login  where username = (select username from customer where customerID = customerIDnumber);
	DELETE FROM customer where customerID = customerIDnumber;
    commit;
end

DELIMITER $$
CREATE PROCEDURE `individualcustomerUpdate`(IN `customerIDnumber` VARCHAR(40), IN `firstname` VARCHAR(50), IN `lastname` VARCHAR(50), IN `NIC` VARCHAR(50), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `nameuser` VARCHAR(100), IN `pass` VARCHAR(100), IN `type` VARCHAR(50))
BEGIN
set AUTOCOMMIT = 0;
	call `individualcustomerDelete`(`customerIDnumber`);
	call `individualcustomerLogin`(`customerIDnumber`,`firstname`,`lastname`,`NIC`, `email`,`phoneNumber`,`buildingNumber`, `streetName` , `city`,`nameuser`,`pass`,`type`);
    
    commit;
end$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `managerRegisterUpdate`(IN `employeeIDnum` VARCHAR(40), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `nic` VARCHAR(11), IN `email` VARCHAR(50), IN `phoneNumber` VARCHAR(15), IN `buildingNumber` VARCHAR(50), IN `streetName` VARCHAR(50), IN `city` VARCHAR(50), IN `salary` VARCHAR(10), IN `designation` VARCHAR(50), IN `branchID` VARCHAR(10), IN `nameuser` VARCHAR(50), IN `pass` VARCHAR(50), IN `type` VARCHAR(50))
BEGIN
set AUTOCOMMIT = 0;
		call deleteManager(employeeIDnum);
		call `managerRegister`(`employeeIDnum`,`firstName`,`lastName`,`nic`,`email`,`phoneNumber`,`buildingNumber`, `streetName`,`city`,`salary`,`designation` , `branchID`,`nameuser` ,`pass`,`type`);
    commit;
end$$
DELIMITER ;


--trigger syntax

DELIMITER //

create trigger trigger_name trigger_time trigger_event

    ON table_name
    FOR each ROW

    BEGIN
    --logic
    end //
DELIMITER ;

--multiple triggers

DELIMITER //

create trigger trigger_name trigger_time trigger_event

    ON table_name
    FOR each ROW [Follows|precedes] existing_trigger_name

    BEGIN
    --logic
    end //
DELIMITER ;


--scheduled events

create event [ if not exist] event_name
on schedule schedule
do
event_body

--code

SET GLOBAL event_scheduler = ON;

create event if not EXISTS event_01
on SCHEDULE at CURRENT_TIMESTAMP
DO
INSERT INTO `tbl_books` (`id`, `book_name`, `book_author`, `book_publication`, `book_description`) VALUES (NULL, 'book 5', 'author 5', 'publication 5', 'description 5');

create event if not EXISTS event_02 
on SCHEDULE at CURRENT_TIMESTAMP + interval 20 second
DO 
INSERT INTO `tbl_books` (`id`, `book_name`, `book_author`, `book_publication`, `book_description`) VALUES (NULL, 'book 7', 'author 7', 'publication 7', 'description 7')



CREATE
[DEFINER = user]
event
[IF NOT EXISTS]
event_name
ON SCHEDULE schedule
[ON COMPLETION [NOT] PRESERVE]
[ENABLE |DISABLE | DISABLE ON SLAVE]
[COMMENT 'STRING']
DO event_body

schedulr:
    AT timestamp [+ Interval interval] ..
    | EVERY INTERVAL 
     [STARTS timestamp [+Interval interval] ...]
    [ENDS timestamp [+Interval interval] ...]

interval:
quantity {YEAR|QUARTER |MONTH|DAY|HOUR|MINUTE
|WEEK|SECOND|YEAR_MONTH|DAY_HOUR|DAY_MINUTE|DAY_SECOND
|HOUR_MINUTE|HOUR_SECOND|MINUTE_SECOND}

--keep on mysql after completion

create event if not EXISTS event_04 on 
SCHEDULE at CURRENT_TIMESTAMP + interval 40 second 
ON COMPLETION PRESERVE 
DO 
INSERT INTO `tbl_books` (`id`, `book_name`, `book_author`, `book_publication`, `book_description`) VALUES (NULL, 'book 7', 'author 7', 'publication 7', 'description 7')


create event if not EXISTS event_05 on SCHEDULE 
 EVERY 1 SECOND 
STARTS CURRENT_TIMESTAMP 
ENDS CURRENT_TIMESTAMP + INTERVAL 20 SECOND
DO

INSERT INTO `tbl_books` (`id`, `book_name`, `book_author`, `book_publication`, `book_description`) VALUES (NULL, 'book 10', 'author 10', 'publication 10', 'description 10')

--INFINITE

create event if not EXISTS event_06 
on SCHEDULE EVERY 3 SECOND 
STARTS CURRENT_TIMESTAMP + INTERVAL 5 SECOND 
DO
 INSERT INTO `tbl_books` (`id`, `book_name`, `book_author`, `book_publication`, `book_description`) VALUES (NULL, 'book 11', 'author 11', 'publication 11', 'description 11')


--commands

show events from db_name
drop event if exists event_name