Db = require("../../Core/DB.js");

var table = "account";
var ID = "accountNum";//primary key





exports.close = (id, data) => {

    return Db.updatedata(table, { "column": ID, "value": id, "body": data }).then((results) => {

        return results;
    });

};


