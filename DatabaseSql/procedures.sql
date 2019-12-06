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
