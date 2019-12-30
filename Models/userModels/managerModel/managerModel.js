
Db = require("../../../Core/DB.js");
var table = "manager";
var ID = "employeeID";//primary key


exports.getById = (id) => {
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};