Db = require("../../../Core/DB");

var table1 = "depositereceipts"
var table2 = "withdrawalreceipts"
var table3 = "transferreceipts"

exports.getAllD = () => {
    return Db.getAll(table1).then((results) => {
        return results;
    });

};
exports.getAllW = () => {
    return Db.getAll(table2).then((results) => {
        return results;
    });

};
exports.getAllT = () => {
    return Db.getAll(table3).then((results) => {
        return results;
    });

};



