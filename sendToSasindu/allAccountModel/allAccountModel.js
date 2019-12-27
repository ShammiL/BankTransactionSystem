Db = require("../../Core/DB.js");

var table = "account";
var ID = "accountNum";//primary key





exports.close = (id) => {

    return Db.updatedata(table, { "column": ID, "value": id, "body": {"closed":1} }).then((results) => {

        return results;
    });
}

exports.reopen = (id) => {

    return Db.updatedata(table, { "column": ID, "value": id, "body": {"closed":0} }).then((results) => {

        return results;
    });
}
exports.getByID = (id) => {

    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {
        console.log(results)
        return results;
    });
}




