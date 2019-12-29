LoanRequestModel = require("../../LoanRequestModels/loanRequestModel")
const uuidv4 = require('uuid/v4');
interest = require("../../../interestRates/loanTimes")
procedure = require("../../../Core/databaseEvents/procedures/procedures")
ManagerModel = require("./managerModel")
FDTypeModel = require("../../FixedDepositType/fixedDepositTypeModel")


exports.viewRequests = (req, res) => {
    LoanRequestModel.getAll().then((result) => {
        res.send({
            "code": 200,
            "result": result
        })
    })


};


exports.approveLoan = (req, res) => {

    var loanNumber = uuidv4()
    var requestID = req.body.details.requestID
    var managerID = req.body.details.managerID
    console.log(req.body)
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
                ).then((result) => {
                    res.send({
                        "success": "Success",
                        "code": 200,
                        "result": result
                    })
                })


            }
        })

};

exports.changeInterestRates = (req, res) => {

    var managerID = req.body.details.managerID
    var duration = req.body.details.duration
    var interest = req.body.details.interest
    var type = req.body.details.FDType

    ManagerModel.getById(managerID).then((manager) => {
        if (manager.length <= 0) {
            res.send({
                "success": "You are not a manager",
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
                    res.send({
                        "code": 200,
                        "result": result
                    })
                });



        }
    });
}

