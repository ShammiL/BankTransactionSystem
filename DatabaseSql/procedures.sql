-- individual customer registeration

DELIMITER //
create procedure individualcustomerLogin(customerID varchar(40),firstname varchar(50),lastname varchar(50),NIC varchar(50),email varchar(50),phoneNumber varchar(15),buildingNumber varchar(50),streetName varchar(50),city varchar(50))
BEGIN
	insert into customers(customerID,email,phoneNumber,buildingNumber,streetName,city) values(customerID,email,buildingNumber,phoneNumber,streetName,city);
    insert into individualcustomer(customerID,firstName,lastName,NIC) values(customerID,firstName,lastName,NIC);
end;//
DELIMITER ;


-- call individualcustomerLogin('customerID','firstname','lastname','NIC','email','phoneNumber','buildingNumber','streetName','city')

-- company customer register

