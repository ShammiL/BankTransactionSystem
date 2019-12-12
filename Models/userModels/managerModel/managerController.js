LoanRequestModel = require("../../LoanRequestModels/loanRequestModel")
const uuidv4 = require('uuid/v4');
interest = require("../../../interestRates/loanTimes")
procedure = require("../../../Core/databaseEvents/procedures/procedures")
exports.approveLoan = (req, res) => {

    var loanNumber = uuidv4()
    var requestID = req.body.details.requestID
    var managerID = req.body.details.managerID

    LoanRequestModel.getById(requestID)
        .then((result) => {
            if (result <= 0) {
                res.send({
                    "success": "No Loan Request",
                    "code": 204
                })
            }
            else {

                var customerID = result[0].customerID;
                var amount = result[0].amount;
                var duration = interest.offlineLoanDuration
                var monthlyInstallement = interest.offlineLoanMonthlyInstallment
                procedure.approveLoan(
                    loanNumber, customerID, amount, null, monthlyInstallement, duration, requestID, managerID
                )
                    .then((result) => {
                        res.send({
                            "success": "Success",
                            "code": 204,
                            "result": result
                        })
                    })


            }
        })

};

