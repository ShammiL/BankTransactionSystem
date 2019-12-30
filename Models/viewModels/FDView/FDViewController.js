FDViewModel = require("./FDViewModel")


exports.getDetails = (req, res) => {

    FDViewModel.getAll().then(
        (results) => {
            res.send(results)
        }
    );

}
exports.getByAccount = (req, res) => {

    FDViewModel.getByAccount(req.params.accountNum).then(
        (results) => {
            res.send(results)
        }
    );

}
exports.getByType = (req, res) => {

    FDViewModel.getByType(req.params.type).then(
        (results) => {
            res.send(results)
        }
    );

}

exports.getByFDNumber = (req, res) => {

    FDViewModel.getByID(req.params.FDNumber).then(
        (results) => {
            res.send(results)
        }
    );

}

