
ReportModel = require("./reportModel")

exports.getAll = (req, res) => {
    ReportModel.getAll().then((result) => {
        res.send(result)
    });
}

exports.getbyID = (req, res) => {
    ReportModel.getByID(req.params.FDNumber).then((result) => {
        res.send(result)
    });
}

exports.update = (req, res) => {
    ReportModel.update(req.body.FDNumber, req.body.details).then((result) => {
        res.send(result)
    });
}

exports.getByDate = (req, res) => {
    var date = req.body.date
    ReportModel.getByDate(date).then((result) => {
        res.send(result)
    });
}

exports.getByMonth = (req, res) => {
    ReportModel.getAll().then((result) => {
        res.send(result)
    });
}
