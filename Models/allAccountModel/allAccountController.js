
allAccountModel = require("./allAccountModel")

exports.close = (req, res) => {
    allAccountModel.close(req.body.id).then((result) => {
        res.send(result)
    });
}
exports.reopen = (req, res) => {
    allAccountModel.getByID(req.body.id).then((result) => {
if(result[0].closed == 0)
{
    res.send({
        "success":"Account not closed",
        "code":204
    })
}
else{
    allAccountModel.reopen(req.body.id).then((result) => {
        res.send({
            "code":200,
            "result":result
        })
    });
}   

});
    
}

