
create event if not EXISTS event_06 
on SCHEDULE EVERY 3 SECOND 
STARTS CURRENT_TIMESTAMP + INTERVAL 5 SECOND 
DO
select interest+(interest*amount)/36500 from fdaccountdetails


create event if not EXISTS Upload_FD_Interest
on SCHEDULE EVERY 10 SECOND 
STARTS CURRENT_TIMESTAMP + INTERVAL 5 SECOND 
DO
update fdaccountdetails set amount = amount+amount*interest/36500;

create event if not EXISTS Upload_Saving_Interest
on SCHEDULE EVERY 10 SECOND 
STARTS CURRENT_TIMESTAMP + INTERVAL 5 SECOND 
DO
update viewallsavingaccountsdetails set balance = balance+balance*interest/36500;
