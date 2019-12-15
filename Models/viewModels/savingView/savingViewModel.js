Db = require("../../../Core/DB");

var table = "FDAccountDetails";
var ID = "FDNumber";//primary key



exports.getByID = (id) => {

    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
exports.getByType = (id) => {

    return Db.getByColumn(table, { "column": "FDType", "body": id }).then((results) => {

        return results;
    });

};
// this.getByUsername(7);


