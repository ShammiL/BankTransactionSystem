
LoanModel = require("./loanModel")
customerModel = require('../userModels/customers/customersModel')

exports.getRemaining = (req, res) => {
    LoanModel.getRemainingLoanAmount(req.params.loanNum).then((result) => {
        res.send(result)
    });
}

exports.getAll = (req, res) => {
    LoanModel.getAll().then((result) => {
        res.send(result)
    });
}

exports.getByCustomerId = (req, res) => {
    console.log(req.params.customerID)
    if (req.params.customerID == undefined || req.params.customerID == 'all') {
        LoanModel.getAll().then((result) => {
            res.send(result)
        });
    }
    else {
        console.log(req.params.customerID)
        customerModel.getByUsername(req.params.customerID).then((user) => {
            console.log("User", user)
            LoanModel.getByCustomerId(user[0].customerID).then((result) => {
                res.send(result)
            });

        })


    }
}