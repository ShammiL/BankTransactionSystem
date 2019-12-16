EmployeeModel = require("./employeesModel.js");
CustomerModel = require("../customers/customersModel");
accountModel = require("../../accountModel/accountModel.js");
const uuidv4 = require('uuid/v4');
names = require("../../../Config/userTypeNames");
procedures = require("../../../Core/databaseEvents/procedures/procedures");
LoanRequestModel = require("../../LoanRequestModels/loanRequestModel");
BranchModel = require("../../branchModel/branchModel");
LoanModel = require("../../loanModel/loanModel");
MonthlyInstallment = require("../../monthlyInstallement/monthlyInstallementMode");
interest = require("../../../interestRates/interestRates")
SavingsAccountModel = require("../../savingsaccountModel/savingsaccountModel")
functions = require("../../../Core/databaseEvents/procedures/functions")
config = require("../../../Config/userTypeNames")
branchModel = require("../../branchModel/branchModel")
Guardian = require("../individualCustomer/individualCustomerModel")
FDModel__ = require("../../FixedDepositType/fixedDepositTypeModel")
savingViewModel = require("../../viewModels/savingView/savingViewModel")
childModel = require("../childCustomers/childModel")




exports.getById = (req, res) => {
    EmployeeModel.getById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getAll = (req, res) => {
    EmployeeModel.getAll()
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByEmail = (req, res) => {
    EmployeeModel.getByEmail(req.params.email)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.update = (req, res) => {

    if (req.body.type = config.manageremployee) {
        procedures.managerRegisterUpdate(
            req.body.employeeID, req.body.firstname, req.body.lastname, req.body.NIC, req.body.email, req.body.phoneNumber, req.body.buildingNumber, req.body.streetName, req.body.city, req.body.salary, req.body.designation, req.body.branchID, req.body.username, req.body.password, req.body.type
        )
            .then((result) => {
                res.status(200).send(result);
            });
    }
    else {

        procedures.otherEmployeeRegisterUpdate(
            req.body.employeeID, req.body.firstname, req.body.lastname, req.body.NIC, req.body.email, req.body.phoneNumber, req.body.buildingNumber, req.body.streetName, req.body.city, req.body.salary, req.body.designation, req.body.branchID, req.body.username, req.body.password, req.body.type
        )
            .then((result) => {
                res.status(200).send(result);
            });

    }

};


exports.delete = (req, res) => {
    EmployeeModel.delete(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    console.log(req.body)
    req.body.employeeID = uuidv4()



    if (req.body.details.designation == names.manageremployee) {

        procedures.managerRegisterProcedure(
            req.body.employeeID, req.body.details.firstName, req.body.details.lastName, req.body.details.nic, req.body.details.email, req.body.details.phoneNumber, req.body.details.buildingNumber, req.body.details.streetName, req.body.details.city, req.body.details.salary, req.body.details.designation, req.body.details.branchID, req.body.details.username, req.body.details.password, req.body.details.type
        )
            .then((result) => {
                res.status(200).send(result);
            });
    }
    else {

        procedures.otherEmployeeRegisterProcedure(
            req.body.employeeID, req.body.details.firstName, req.body.details.lastName, req.body.details.nic, req.body.details.email, req.body.details.phoneNumber, req.body.details.buildingNumber, req.body.details.streetName, req.body.details.city, req.body.details.salary, req.body.details.designation, req.body.details.branchID, req.body.details.username, req.body.details.password, req.body.details.type
        )
            .then((result) => {
                res.status(200).send(result);
            });

    }
};


exports.offlineDeposite = (req, res) => {
    // console.log("BODY", req.body);
    req.body.reciptnumber = uuidv4()
    var amount = req.body.details.amount
    var account = req.body.details.accountID
    //call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')
    accountModel.getByID(account)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "AccountNumber doesn't exists",
                    "code": 200
                })
            }
            else {
                console.log("RESULT", result)
                var balance_ = parseFloat(result[0].balance) + parseFloat(amount);
                console.log("balance", result[0].balance, parseFloat(amount), balance_)
                console.log(req.body.reciptnumber, amount, account, new Date().toString(), new Date().toString(), balance_)

                procedures.makeOfflineDeposite(req.body.reciptnumber, amount, account, Date().toString(), Date().toString(), balance_)
                    .then((result) => {
                        res.status(200).send(result);
                    });

            }


        });



};

exports.offlineWithdrawal = (req, res) => {
    // console.log("BODY", req.body);
    req.body.reciptnumber = uuidv4()
    var amount = req.body.details.amount
    var account = req.body.details.accountID
    //call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')
    accountModel.getByID(account)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "AccountNumber doesn't exists",
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
                                procedures.withdrawalAccount(req.body.reciptnumber, amount, account, Date().toString(), Date().toString(), balance_, result[0].branchID)
                                    .then((result) => {
                                        res.send(
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

                                procedures.withdrawalAccount(req.body.reciptnumber, amount, account, Date().toString(), Date().toString(), balance_, result[0].branchID)
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


        });



};

exports.createSavingAccount = (req, res) => {
    // console.log("BODY", req.body);
    var branchname = req.body.details.branchID;
    req.body.accountID = uuidv4()
    var type = req.body.details.type
    var accountType = req.body.details.accountType
    var customerID = req.body.details.customerID
    var guardianID = req.body.details.guardianID
    CustomerModel.getById(customerID)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "successs": "User doesn't Exists",
                    "code": 204
                })
            }
            else {
                branchModel.getByName(branchname).then((branch) => {
                    if (branch < 0) {
                        res.send({
                            "successs": "branch doesn't Exists",
                            "code": 204
                        })
                    }
                    else {

                        if (accountType != "Child") {
                            procedures.createAccountCustomer(req.body.accountID, type, accountType, customerID, 0, 0, branch[0].branchID, 0, '')
                                .then((result) => {
                                    res.status(200).send(result);
                                });

                        }
                        else {
                            Guardian.getByID(guardianID)
                                .then((guardian) => {
                                    console.log("Child", result)
                                    console.log("GUARDIAN", guardian)
                                    if (guardian[0].length <= 0) {
                                        res.send({
                                            "successs": "guardian hasn't a account",
                                            "code": 204
                                        })

                                    }
                                    else {

                                        childModel.getById(customerID).then((child) => {
                                            if (child.length <= 0) {
                                                res.send({
                                                    "successs": "Please Register as a child",
                                                    "code": 204
                                                })
                                            }
                                            else {
                                                console.log(child)
                                                procedures.createAccountCustomer(req.body.accountID, type, accountType, customerID, 0, 0, branch[0].branchID, 0, guardian[0].customerID)
                                                    .then((result) => {
                                                        res.status(200).send(result);
                                                    });
                                            }


                                        })
                                        {



                                        }
                                    }
                                });

                        }
                    }
                })
            }


        });
}



exports.createCheckingAccount = (req, res) => {
    req.body.accountID = uuidv4()
    var branchname = req.body.details.branchID;
    var type = req.body.details.type
    var customerID = req.body.details.customerID
    CustomerModel.getById(customerID)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "successs": "User doesn't Exists",
                    "code": 204
                })
            }
            else {

                branchModel.getByName(branchname).then((branch) => {
                    if (branch.length <= 0) {
                        res.send({
                            "successs": "branch doesn't Exists",
                            "code": 204
                        })
                    }

                    else {
                        console.log(branch)
                        procedures.createAccountCustomer(req.body.accountID, type, '', customerID, 0, 0, branch[0].branchID, 0, 0)
                            .then((result) => {
                                res.status(200).send(result);
                            });


                    }
                })


            }

        });
};
exports.requestOfflineLoan = (req, res) => {

    req.body.requestID = uuidv4()
    var description = req.body.details.description
    var loanOfficerID = req.body.details.loanOfficerID
    var branchname = req.body.details.branchID
    var customerID = req.body.details.customerID
    var amount = req.body.details.amount

    CustomerModel.getById(customerID)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "successs": "User doesn't Exists",
                    "code": 204
                })
            }
            else {

                EmployeeModel.getById(loanOfficerID)
                    .then((result) => {
                        if (result <= 0) {
                            res.send({
                                "successs": "Employee doesn't Exists",
                                "code": 204
                            })
                        }
                        else {

                            BranchModel.getByName(branchname)
                                .then((result) => {

                                    if (result <= 0) {
                                        res.send({
                                            "successs": "Branch doesn't Exists",
                                            "code": 204
                                        })
                                    }
                                    else {

                                        LoanRequestModel.insert(
                                            {
                                                "requestID": req.body.requestID,
                                                "description": description,
                                                "amount": amount,
                                                "date_": null,
                                                "approved": false,
                                                "loanOfficerID": loanOfficerID,
                                                "approvedBy": "7f177d91-c",
                                                "branchID": result[0].branchID,
                                                "customerID": customerID

                                            }
                                        )
                                            .then((result) => {
                                                res.send({
                                                    "successs": "Done",
                                                    "code": 200,
                                                    result: result
                                                })

                                            })

                                    }

                                })

                        }


                    });
            }
        });


};

exports.PayMonthlyInstallement = (req, res) => {
    // console.log("BODY", req.body);
    req.body.paymentID = uuidv4()
    var loanNum = req.body.details.loanNum
    var month = req.body.details.month
    var year = req.body.details.year
    //call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')
    LoanModel.getById(loanNum)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "LoanNumber doesn't exists",
                    "code": 200
                })
            }
            else {

                MonthlyInstallment.insert(
                    {
                        "paymentID": req.body.paymentID,
                        "loanNum": loanNum,
                        "month": month,
                        "year": year,
                        "datePaid": null
                    }
                )
                    .then((result) => {
                        res.send({
                            "successs": "Done",
                            "code": 200,
                            result: result
                        })

                    })

            }


        });



};

exports.createFD = (req, res) => {
    // console.log("BODY", req.body);
    var FDNumber = uuidv4()
    var customerID = req.body.details.customerID
    var accountNumber = req.body.details.accountID
    var amount = req.body.details.amount
    var FDType = req.body.details.FDType
    SavingsAccountModel.getByID(accountNumber)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "AccountNumber doesn't exists",
                    "code": 204
                })
            }
            else {
                functions.checkFDInstallment(customerID)
                    .then((res_) => {
                        if (res_ == 0) {
                            res.send({
                                "success": "You haven't a Saving Account",
                                "code": 204
                            })
                        }
                        else {
                            FDModel__.getByType(FDType)
                                .then((results) => {
                                    console.log(results)
                                    if (results.length <= 0) {
                                        res.send({
                                            "success": "Invalid FD Type",
                                            "code": 204
                                        })
                                    }
                                    else {
                                        procedures.createFD(accountNumber, amount, FDNumber, null, FDType)
                                            .then((result) => {
                                                res.status(200).send(result);
                                            });
                                    }
                                })



                        }
                    })


            }


        });



};



