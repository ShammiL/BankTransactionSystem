
AccountModel = require("./accountModel")

exports.getAll = (req, res) => {
    AccountModel.getDetails().then((result) => {
        res.send(result)
    });
}

exports.getbyID = (req, res) => {
    AccountModel.getByID(req.params.customerID).then((result) => {
        res.send(result)
    });
}