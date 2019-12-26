
allAccountModel = require("./allAccountModel")

exports.close = (req, res) => {
    allAccountModel.close(req.body.id).then((result) => {
        res.send(result)
    });
}

