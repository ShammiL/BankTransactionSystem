CustomerModel = require("./customersModel.js");
const jwt = require("jsonwebtoken")
const uuidv4 = require('uuid/v4');
customerProcedures = require('../../../Core/databaseEvents/procedures/procedures')
names = require("../../../Config/userTypeNames")
FDModel = require("../../FDModel/FDModel")
functions = require("../../../Core/databaseEvents/procedures/functions")
interest = require("../../../interestRates/loanTimes")
config = require("../../../Config/userTypeNames")
IndividualCustomerViewModel = require("../..//viewModels/individualCustomer")
ATMModel = require("../../atmModel/atmModel")
hashFunction = require("../../../Functions/functions")

exports.getById = (req, res) => {
    CustomerModel.getById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getAll = (req, res) => {
    CustomerModel.getAll()
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByEmail = (req, res) => {
    CustomerModel.getByEmail(req.params.email)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.update = (req, res) => {



    if (req.body.type = config.individualcustomer) {
        customerProcedures.updateIndividualCustomer(
            req.body.customerID, req.body.firstname, req.body.lastname, req.body.NIC, req.body.email, req.body.phoneNumber, req.body.buildingNumber, req.body.streetName, req.body.city, req.body.username, req.body.password, req.body.type
        )
            .then((result) => {
                res.status(200).send(result);
            });
    }
    if (req.body.type = config.companycustomer) {
        customerProcedures.companycustomerUpdate(
            req.body.customerID, req.body.companyName, req.body.email, req.body.phoneNumber, req.body.buildingNumber, req.body.streetName, req.body.city, req.body.username, req.body.password, req.body.type
        )
            .then((result) => {
                res.status(200).send(result);
            });
    }

};


exports.delete = (req, res) => {
    CustomerModel.delete(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    console.log(req.body.details)
    var email = req.body.details.email;
    var username = req.body.details.username;
    var NIC = req.body.details.nic;
    var type = req.body.details.type;

    functions.checkValidateOfRegister(username, email, NIC, '', type).then((message) => {
        if (message != "OK") {
            console.log("VALIDATE MESSAGE", message)
            res.send({
                "success": message,
                "code": 204
            })
        }
        else {
            hashFunction.hashPassword(req.body.details.password)
                .then((hash) => {
                    console.log("hashregister", hash)
                    req.body.details.password = hash

                    // console.log(req.body)
                    req.body.customerID = uuidv4()
                    if (req.body.details.type == names.individualcustomer) {
                        customerProcedures.individualCustomerLogin(
                            req.body.customerID, req.body.details.firstname, req.body.details.lastname, req.body.details.NIC, req.body.details.email, req.body.details.phoneNumber, req.body.details.buildingNumber, req.body.details.streetName, req.body.details.city, req.body.details.username, req.body.details.password, req.body.details.type

                        )
                            .then((result) => {
                                res.send({
                                    "code": 200,
                                    "result": result
                                })
                            });
                    }
                    if (req.body.details.type == names.companycustomer) {
                        customerProcedures.companycustomerLogin(
                            req.body.customerID, req.body.details.companyName, req.body.details.email, req.body.details.phoneNumber, req.body.details.buildingNumber, req.body.details.streetName, req.body.details.city, req.body.details.username, req.body.details.password, req.body.details.type

                        )
                            .then((result) => {
                                res.send({
                                    "code": 200,
                                    "result": result
                                })
                            });

                    }
                    if (req.body.details.type == names.childcustomer) {

                        IndividualCustomerViewModel.getByUsername({ "NIC": req.body.details.guardianID }).then((result) => {

                            console.log("GUARDIAN", result[0])
                            if (result[0] <= 0) {
                                res.send({
                                    "success": "Guardian doesn't exists",
                                    "code": 204
                                })
                            }
                            else {

                                customerProcedures.childCustomerLogin(
                                    req.body.customerID, req.body.details.firstname, req.body.details.lastname, null, req.body.details.phoneNumber, req.body.details.buildingNumber, req.body.details.streetName, req.body.details.city, req.body.details.username, req.body.details.password, req.body.details.type, req.body.details.guardianID

                                )
                                    .then((result) => {
                                        res.send({
                                            "code": 200,
                                            "result": result
                                        })
                                    });
                            }

                        }


                        )


                    }
                })
        }
    })


};

exports.requestOnlineLoan = (req, res) => {

    var loanNum = uuidv4()
    var customerID = req.body.details.customerID
    var amount = parseFloat(req.body.details.amount)
    // var monthlyInstallment = req.body.details.monthlyInstallment
    // var monthlyInstallment = interest.onlineLoanMonthlyInstallment;
    var duration = interest.onlineLoanDuration;
    var monthlyInstallment = (amount / duration) * (1 + interest.LoanInterest)


    CustomerModel.getById(customerID)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "User doesn't Exists",
                    "code": 204
                })
            }
            else {
                console.log(customerID, amount)
                functions.checkForonlineLoan(customerID, amount)
                    .then((result) => {

                        if (result == "error") {
                            res.send({
                                "success": "You havent valid FD account to take this loan",
                                "code": 204
                            })
                        }
                        else {
                            var today = new Date();
                            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                            console.log(result)
                            customerProcedures.addOnlineLoan(
                                loanNum, customerID, amount, date, monthlyInstallment, duration, result
                            )
                                .then((result) => {
                                    res.send({
                                        "success": "Done",
                                        "code": 200,
                                        result: result
                                    })

                                })

                        }

                    })

            }


        });
};

exports.onlineTransfer = (req, res) => {
    // console.log("BODY", req.body);
    var reciptnumber = uuidv4()
    var amount = req.body.details.amount
    var account = req.body.details.accountID
    var customerID = req.body.details.customerID
    var recAccount = req.body.details.recievingAccountID
    console.log(req.body)
    //call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')
    accountModel.getByID(account)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "Sender accountNumber doesn't exists",
                    "code": 204
                })
            }
            else {
                console.log("RESULTRESULT", result[0])
                CustomerModel.getById(customerID).then((cus) => {
                    console.log("CUSCUSCUS", cus)

                    if (cus[0].customerID != result[0].customerID) {
                        res.send({
                            "success": "Account is not yours",
                            "code": 204
                        })
                    }
                    else {

                        accountModel.getByID(recAccount)
                            .then((result_) => {
                                if (result_ <= 0) {
                                    res.send({
                                        "success": "Reciever accountNumber doesn't exists",
                                        "code": 204
                                    })
                                }
                                else {


                                    var recBal = parseFloat(result_[0].balance) + parseFloat(amount)
                                    var senBal = result[0].balance - parseFloat(amount)
                                    savingViewModel.getByID(account)
                                        .then((details) => {
                                            if (details.length > 0) {
                                                console.log("RESULT", result)
                                                console.log("minimum", details[0].minimumAmount)
                                                console.log("Customer remaining", recBal)
                                                console.log("Sender remaining", senBal)

                                                if (senBal < details[0].minimumAmount) {
                                                    res.send({
                                                        "success": "Insufficent balance",
                                                        "code": 204
                                                    })
                                                }
                                                // else if (details[0].withdrawlsRemaining <= 0) {
                                                //     res.send({
                                                //         "success": "Withdrawal limit exceed",
                                                //         "code": 204
                                                //     })
                                                // }
                                                else {
                                                    customerProcedures.onlineTransfer(
                                                        reciptnumber, amount, account, null, null, recAccount, senBal, recBal
                                                    ).then((result) => {
                                                        if (result) {
                                                            res.send({
                                                                "success": "Transfer done successfully",
                                                                "code": 200
                                                            })
                                                        }
                                                    });
                                                }
                                            }
                                            else {

                                                if (senBal < 0) {
                                                    res.send({
                                                        "success": "Insufficent balance",
                                                        "code": 204
                                                    })
                                                }
                                                else {

                                                    customerProcedures.onlineTransfer(
                                                        reciptnumber, amount, account, null, null, recAccount, senBal, recBal
                                                    ).then((result) => {
                                                        if (result) {
                                                            res.send({
                                                                "success": "Transfer done successfully",
                                                                "code": 200
                                                            })
                                                        }
                                                    });
                                                }
                                            }
                                        })






                                    /*
                                                                var recBal = parseFloat(result_[0].balance) + parseFloat(amount)
                                                                var senBal = result[0].balance - parseFloat(amount)
                                                                console.log("value", result[0].balance, senBal, result_[0].balance, recBal, parseFloat(amount))
                                                                if (senBal < 0) {
                                                                    res.send({
                                                                        "success": "You haven't sufficient Balance",
                                                                        "code": 204
                                                                    })
                                                                }
                                                                else {
                                                                    customerProcedures.onlineTransfer(
                                                                        reciptnumber, amount, account, null, null, recAccount, senBal, recBal
                                                                    ).then((result) => {
                                                                        if (result) {
                                                                            res.send({
                                                                                "success": "Transfer done successfully",
                                                                                "code": 204
                                                                            })
                                                                        }
                                                                    });
                                    
                                                                }
                                    
                                    */
                                }
                            })//aa
                    }
                })


            }
        });

};


exports.atmWithdrawal = (req, res) => {
    var reciptnumber = uuidv4()
    var amount = req.body.details.amount
    var account = req.body.details.accountID
    var ATMID = req.body.details.ATMID
    accountModel.getByID(account)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "AccountNumber doesn't exists",
                    "code": 204
                })
            }
            else {
                ATMModel.getBYId(ATMID)
                    .then((atm) => {
                        console.log("ATM", ATMID)
                        if (atm.length <= 0 || atm[0].cashReserve < amount) {
                            res.send({
                                "success": "Atm hasn't enough money",
                                "code": 204
                            })
                        }
                        else {
                            var balance_ = parseFloat(result[0].balance) - parseFloat(amount);
                            savingViewModel.getByID(account)
                                .then((details) => {
                                    if (details.length > 0) {
                                        console.log("RESULT", result)
                                        console.log("minimum", details[0].minimumAmount)
                                        console.log("remaining", balance_)
                                        if (balance_ < details[0].minimumAmount) {
                                            res.send({
                                                "success": "Insufficent balance",
                                                "code": 204
                                            })
                                        }
                                        else if (details[0].withdrawlsRemaining <= 0) {
                                            res.send({
                                                "success": "Withdrawal limit exceed",
                                                "code": 204
                                            })
                                        }
                                        else {
                                            var atmbalance = parseFloat(atm[0].cashReserve) - parseFloat(amount);
                                            procedures.atmwithdrawal(reciptnumber, amount, account, Date().toString(), Date().toString(), balance_, ATMID, atmbalance)
                                                .then((result) => {
                                                    res.status(200).send(
                                                        {
                                                            "result": result,
                                                            "code": 200
                                                        }
                                                    );
                                                });
                                        }
                                    }
                                    else {
                                        if (balance_ < 0) {
                                            res.send({
                                                "success": "Insufficent balance",
                                                "code": 204
                                            })
                                        }
                                        else {
                                            var atmbalance = parseFloat(atm[0].cashReserve) - parseFloat(amount);
                                            procedures.atmwithdrawal(reciptnumber, amount, account, Date().toString(), Date().toString(), balance_, ATMID, atmbalance)
                                                .then((result) => {
                                                    res.status(200).send(
                                                        {
                                                            "result": result,
                                                            "code": 200
                                                        }
                                                    );
                                                });
                                        }
                                    }
                                })


                        }
                    })


                // console.log("RESULT", result)
                // var balance_ = parseFloat(result[0].balance) - parseFloat(amount);
                // if (balance_ < 0) {
                //     res.send({
                //         "success": "Insufficent balance",
                //         "code": 204
                //     })
                // }
                // else {

                //     // ATMModel.getBYId(ATMID)
                //     //     .then((atm) => {
                //     //         console.log("ATM", ATMID)
                //     //         if (atm.length <= 0 || atm[0].cashReserve < amount) {
                //     //             res.send({
                //     //                 "success": "Atm hasn't enough money",
                //     //                 "code": 204
                //     //             })
                //     //         }
                //     //         else {




                //     //             // var atmbalance = parseFloat(atm[0].cashReserve) - parseFloat(amount);
                //     //             // procedures.atmwithdrawal(reciptnumber, amount, account, Date().toString(), Date().toString(), balance_, ATMID, atmbalance)
                //     //             //     .then((result) => {
                //     //             //         res.status(200).send(
                //     //             //             {
                //     //             //                 "result": result,
                //     //             //                 "code": 200
                //     //             //             }
                //     //             //         );
                //     //             //     });

                //     //         }
                //     //     })


                // }


            }


        });



};



