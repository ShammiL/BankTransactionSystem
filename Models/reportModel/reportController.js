
ReportModel = require("./reportModel")

exports.getAll = (req, res) => {
    ReportModel.getAll().then((result) => {
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
