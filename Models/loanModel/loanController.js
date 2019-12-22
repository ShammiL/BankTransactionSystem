
LoanModel = require("./loanModel")

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
        LoanModel.getByCustomerId(req.params.customerID).then((result) => {
            res.send(result)
        });
    }
}