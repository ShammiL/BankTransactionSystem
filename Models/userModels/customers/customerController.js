CustomerModel = require("./customersModel.js");
const jwt = require("jsonwebtoken")
const uuidv4 = require('uuid/v4');
customerProcedures = require('../../../Core/databaseEvents/procedures/procedures')
names = require("../../../Config/userTypeNames")
FDModel = require("../../FDModel/FDModel")
functions = require("../../../Core/databaseEvents/procedures/functions")

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
    var monthlyInstallment = req.body.details.monthlyInstallment
    var duration = req.body.details.duration

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



