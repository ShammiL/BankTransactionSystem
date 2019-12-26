
allAccountModel = require("./allAccountModel")

exports.close = (req, res) => {
    allAccountModel.close(req.body.id).then((result) => {
        res.send(result)
    });
}

exports.reopen = (req, res) => {


    
    allAccountModel.reopen(req.body.id).then((result) => {
        res.send(result)
    });
}

