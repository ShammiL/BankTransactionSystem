
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


CREATE DEFINER=`root`@`localhost` EVENT `Upload_FD_Interest` ON SCHEDULE EVERY 1 DAY STARTS '2019-12-18 00:57:18' ON COMPLETION NOT PRESERVE ENABLE DO update fdaccountdetails set amount = amount+amount*interest/36500

CREATE DEFINER=`root`@`localhost` EVENT `Upload_Saving_Interest` ON SCHEDULE EVERY 1 DAY STARTS '2019-12-18 01:18:34' ON COMPLETION NOT PRESERVE ENABLE DO update viewallsavingaccountsdetails set balance = balance+balance*interest/36500


insert into receipt(receiptNum,amount,accountNum,date_,time_) values(receiptNum,amount,accountNumber,date,time);

SELECT sum(`amount`) from depositereceipts where MONTH(CURRENT_DATE) = MONTH(`date_`)