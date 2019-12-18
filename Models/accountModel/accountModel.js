Db = require("../../Core/DB.js");

var table = "activeaccount";
var ID = "accountNum";//primary key

var table1 = "account";



exports.getByID = (id) => {

    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
exports.getByCustomer = (id) => {

    return Db.getByColumn(table, { "column": "customerID", "body": id }).then((results) => {

        return results;
    });

};

exports.getDetails = (id) => {

    return Db.getAll(table).then((results) => {

        return results;
    });

};

exports.close = (id, data) => {

    return Db.updatedata(table1, { "column": ID, "value": id, "body": data }).then((results) => {

        return results;
    });

};
exports.reopen = (id, data) => {

    return Db.updatedata(table1, { "column": ID, "value": id, "body": data }).then((results) => {

        return results;
    });

};


