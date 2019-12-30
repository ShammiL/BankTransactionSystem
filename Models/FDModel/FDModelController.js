
FDModel = require("./FDModel")

exports.getAll = (req, res) => {
    FDModel.getAll().then((result) => {
        res.send(result)
    });
}

exports.getbyID = (req, res) => {
    FDModel.getByID(req.params.FDNumber).then((result) => {
        res.send(result)
    });
}

exports.update = (req, res) => {
    FDModel.update(req.body.FDNumber, req.body.details).then((result) => {
        res.send(result)
    });
}