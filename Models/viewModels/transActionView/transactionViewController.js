transModel = require("./transactionViewModel")
atmModel = require("../../atmModel/atmModel")


exports.getAllManager = (req, res) => {
    var type = req.params.type;
    if (type == "deposit") {
        transModel.getAllD().then((result) => {
            res.send(result);
        })
    }
    if (type == "withdrawal") {
        transModel.getAllW().then((result) => {
            res.send(result);
        })
    }
    if (type == "transfer") {
        transModel.getAllT().then((result) => {
            res.send(result);
        })
    }
    if (type == "atm") {
        atmModel.getAll().then((result) => {
            res.send(result);
        })
    }
}

exports.getReport = (req, res) => {
    var type = req.params.type;
    var date = req.body.date;

    if (type == "deposit") {
        transModel.getByDateD(date).then((result) => {
            res.send(result);
        })
    }
    if (type == "withdrawal") {
        transModel.getByDateW(date).then((result) => {
            res.send(result);
        })
    }
    if (type == "transfer") {
        transModel.getByDateT(date).then((result) => {
            res.send(result);
        })
    }
    if (type == "atm") {
        atmModel.getAll().then((result) => {
            res.send(result);
        })
    }
}

exports.getAllEmployee = (req, res) => {
    var type = req.params.type;
    if (type == "deposit") {
        transModel.getAllD().then((result) => {
            res.send(result);
        })
    }
    if (type == "withdrawal") {
        transModel.getAllW().then((result) => {
            res.send(result);
        })
    }
    if (type == "transfer") {
        transModel.getAllT().then((result) => {
            res.send(result);
        })
    }
    if (type == "atm") {
        atmModel.getAll().then((result) => {
            res.send(result);
        })
    }
}