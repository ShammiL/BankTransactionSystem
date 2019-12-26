
allAccountModel = require("./allAccountModel")

exports.close = (req, res) => {
    allAccountModel.close().then((result) => {
        res.send(result)
    });
}

