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