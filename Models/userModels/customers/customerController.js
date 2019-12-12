CustomerModel = require("./customersModel.js");
const jwt = require("jsonwebtoken")
const uuidv4 = require('uuid/v4');
customerProcedures = require('../../../Core/databaseEvents/procedures/procedures')
names = require("../../../Config/userTypeNames")
FDModel = require("../../FDModel/FDModel")
functions = require("../../../Core/databaseEvents/procedures/functions")
interest = require("../../../interestRates/loanTimes")
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
    console.log(req.params);
    CustomerModel.update(req.body, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.delete = (req, res) => {
    CustomerModel.delete(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    // console.log(req);
    req.body.customerID = uuidv4()
    data = "\'" + req.body.details.email + "\'"
        + "," +
        "\'" + req.body.details.phoneNumber + "\'"
        + "," +
        "\'" + req.body.details.buildingNumber + "\'"
        + "," +
        "\'" + req.body.details.streetName + "\'"
        + ","
        + "\'" + req.body.details.city + "\'"
        + ","
        + "\'" + req.body.details.username + "\'"
        + ","
        + "\'" + req.body.details.password + "\'"
    if (req.body.details.type == names.individualcustomer) {
        data = "\'" + req.body.customerID + "\'"
            + "," +
            "\'" + req.body.details.firstName + "\'"
            + "," +
            "\'" + req.body.details.lastName + "\'"
            + "," +
            "\'" + req.body.details.nic + "\'"
            + "," + data
            + "," +
            "\'" + req.body.details.type + "\'"

        console.log(data)
        customerProcedures.individualCustomerLogin(data)
            .then((result) => {
                console.log("RE", result)
                res.status(200).send(result);
            });
    }
    else {
        data = data = "\'" + req.body.customerID + "\'"
            + "," +
            "\'" + req.body.details.companyName + "\'"
            + "," + data
            + "," +
            "\'" + req.body.details.type + "\'"
        console.log(data)
        customerProcedures.companycustomerLogin(data)
            .then((result) => {
                console.log("RE", result)
                res.status(200).send(result);
            });

    }
    // console.log(data)

};

exports.requestOnlineLoan = (req, res) => {

    var loanNum = uuidv4()
    var customerID = req.body.details.customerID
    var amount = parseFloat(req.body.details.amount)
    // var monthlyInstallment = req.body.details.monthlyInstallment
    var monthlyInstallment = interest.onlineLoanMonthlyInstallment;
    var duration = interest.onlineLoanDuration;

    CustomerModel.getById(customerID)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "successs": "User doesn't Exists",
                    "code": 204
                })
            }
            else {
                console.log(customerID, amount)
                functions.checkForonlineLoan(customerID, amount)
                    .then((result) => {

                        if (result == "error") {
                            res.send({
                                "successs": "You havent valid FD account to take this loan",
                                "code": 204
                            })
                        }
                        else {
                            console.log(result)
                            customerProcedures.addOnlineLoan(
                                loanNum, customerID, amount, null, monthlyInstallment, duration, result
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
};

exports.onlineTransfer = (req, res) => {
    // console.log("BODY", req.body);
    var reciptnumber = uuidv4()
    var amount = req.body.details.amount
    var account = req.body.details.accountID
    var recAccount = req.body.details.recievingAccountID
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


                        }
                    })


            }
        });

};



