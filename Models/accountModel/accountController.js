
AccountModel = require("./accountModel")

exports.getAll = (req, res) => {
    AccountModel.getDetails().then((result) => {
        res.send(result)
    });
}

exports.getbyID = (req, res) => {
    AccountModel.getByID(req.params.accountNum).then((result) => {
        res.send(result)
    });
}
exports.getByCustomer = (req, res) => {
    AccountModel.getByCustomer(req.params.customerID).then((result) => {
        res.send(result)
    });
}
exports.close = (req, res) => {
    AccountModel.close(req.params.accountNum, { "closed": 1 }).then((result) => {
        res.send(result)
    });
}
exports.reopen = (req, res) => {
    AccountModel.reopen(req.params.accountNum, { "closed": 0 }).then((result) => {
        res.send(result)
    });
}
