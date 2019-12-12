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
    console.log(req.params);
    EmployeeModel.update(req.body, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.delete = (req, res) => {
    EmployeeModel.delete(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    // console.log("BODY", req.body);
    req.body.employeeID = uuidv4()

    //call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')

    var data = '';
    if (req.body.details.designation == names.manageremployee) {
        data = "\'" + req.body.employeeID + "\'"
            + "," +
            "\'" + req.body.details.firstName + "\'"
            + "," +
            "\'" + req.body.details.lastName + "\'"
            + "," +
            "\'" + req.body.details.nic + "\'"
            + "," +
            "\'" + req.body.details.email + "\'"
            + "," +
            "\'" + req.body.details.phoneNumber + "\'"
            + "," +
            "\'" + req.body.details.buildingNumber + "\'"
            + "," +
            "\'" + req.body.details.streetName + "\'"
            + "," +
            "\'" + req.body.details.city + "\'"
            + "," +
            "\'" + req.body.details.salary + "\'"
            + "," +
            "\'" + req.body.details.designation + "\'"
            + "," +
            "\'" + req.body.details.branchID + "\'"
            + "," +
            "\'" + req.body.details.username + "\'"
            + "," +
            "\'" + req.body.details.password + "\'"
            + "," +
            "\'" + req.body.details.type + "\'"



        EmployeeModel.managerRegisterProcedure(data)
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
                    "code": 200
                })
            }
            else {
                console.log("RESULT", result)
                var balance_ = parseFloat(result[0].balance) - parseFloat(amount);
                console.log("balance", result[0].balance, parseFloat(amount), balance_)
                console.log(req.body.reciptnumber, amount, account, new Date().toString(), new Date().toString(), balance_)

                procedures.withdrawalAccount(req.body.reciptnumber, amount, account, Date().toString(), Date().toString(), balance_)
                    .then((result) => {
                        res.status(200).send(result);
                    });

            }


        });



};

exports.createSavingAccount = (req, res) => {
    // console.log("BODY", req.body);
    req.body.accountID = uuidv4()
    var type = req.body.details.type
    var accountType = req.body.details.accountType
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

                procedures.createAccountCustomer(req.body.accountID, type, accountType, customerID)
                    .then((result) => {
                        res.status(200).send(result);
                    });

            }

        });
};

exports.createCheckingAccount = (req, res) => {
    req.body.accountID = uuidv4()
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

                procedures.createAccountCustomer(req.body.accountID, type, '', customerID)
                    .then((result) => {
                        res.status(200).send(result);
                    });

            }

        });
};
exports.requestOfflineLoan = (req, res) => {

    req.body.requestID = uuidv4()
    var description = req.body.details.description
    var loanOfficerID = req.body.details.loanOfficerID
    var branchname = req.body.details.branchID
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
    var duration = req.body.details.duration
    var interest_ = interest.FD;
    //call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')
    SavingsAccountModel.getByID(accountNumber)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "AccountNumber doesn't exists",
                    "code": 200
                })
            }
            else {
                functions.checkFDInstallment(customerID)
                    .then((res_) => {
                        if (res_ == 0) {
                            res.send({
                                "success": "You haven't a Saving Account",
                                "code": 200
                            })
                        }
                        else {
                            procedures.createFD(accountNumber, amount, FDNumber, duration, null, interest_)
                                .then((result) => {
                                    res.status(200).send(result);
                                });

                        }
                    })


            }


        });



};



