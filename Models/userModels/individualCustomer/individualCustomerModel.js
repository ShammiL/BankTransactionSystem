Db = require("../../../Core/DB.js");

var table = "individualcustomer";
var ID = "customerID";//primary key

exports.getByID = (nic) => {
    return Db.getByColumn(table, { "column": "NIC", "body": nic }).then((results) => {
        return results;
    });

};
exports.getByUsername = (nic) => {
    return Db.getByColumn(table, { "column": "NIC", "body": nic }).then((results) => {
        return results;
    });

};