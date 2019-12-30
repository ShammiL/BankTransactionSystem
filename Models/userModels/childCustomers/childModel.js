Db = require("../../../Core/DB.js");

var table = "childcustomer";
var ID = "customerID";//primary key

exports.getAll = () => {
    return Db.getAll(table).then((results) => {
        return results;
    });

};

//abc
exports.getById = (id) => {
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {
        return results;
    });

};