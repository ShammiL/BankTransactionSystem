
LoanModel = require("./loanModel")

exports.getRemaining = (req, res) => {
    LoanModel.getRemainingLoanAmount(req.params.loanNum).then((result) => {
        res.send(result)
    });
}