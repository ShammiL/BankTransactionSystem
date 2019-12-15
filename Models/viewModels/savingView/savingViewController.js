savingViewModel = require("./savingViewModel")


exports.getDetails = (req, res) => {

    savingViewModel.getAll().then(
        (results) => {
            res.send(results)
        }
    );

}
exports.getByAccount = (req, res) => {

    savingViewModel.getByID(req.params.accountNum).then(
        (results) => {
            res.send(results)
        }
    );

}
exports.getByType = (req, res) => {

    savingViewModel.getByType(req.params.type).then(
        (results) => {
            res.send(results)
        }
    );

}
exports.getByCustomer = (req, res) => {

    savingViewModel.getByCustomer(req.params.customerID).then(
        (results) => {
            res.send(results)
        }
    );

}
