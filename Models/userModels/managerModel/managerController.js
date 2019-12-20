LoanRequestModel = require("../../LoanRequestModels/loanRequestModel")
const uuidv4 = require('uuid/v4');
interest = require("../../../interestRates/loanTimes")
procedure = require("../../../Core/databaseEvents/procedures/procedures")
ManagerModel = require("./managerModel")
FDTypeModel = require("../../FixedDepositType/fixedDepositTypeModel")

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

exports.changeInterestRates = (req, res) => {

    var customerID = req.body.details.customerID
    var duration = req.body.details.duration
    var interest = req.body.details.interest
    var type = req.body.details.FDType

    ManagerModel.getById(customerID).then((manager) => {
        if (manager.length <= 0) {
            res.send({
                "successs": "You are not a manager",
                "code": 204
            })
        }

        else {
            console.log(manager)
            FDTypeModel.update({
                "FDType": type,
                "duration": duration,
                "interest": interest
            }, type)
                .then((result) => {
                    res.status(200).send(result);
                });



        }
    });
}

