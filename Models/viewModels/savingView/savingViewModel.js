Db = require("../../../Core/DB");

var table = "viewallsavingaccountsdetails";
var ID = "accountNum";//primary key



exports.getAll = () => {

    return Db.getAll(table).then((results) => {

        return results;
    });

};


exports.getByCustomer = (id) => {

    return Db.getByColumn(table, { "column": "customerID", "body": id }).then((results) => {

        return results;
    });

};

exports.getByID = (id) => {

    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
exports.getByType = (id) => {

    return Db.getByColumn(table, { "column": "accountType", "body": id }).then((results) => {

        return results;
    });

};

exports.getRestrictions = (accountNum) => {

    return Db.getColumns(table, ["withdrawlsRemaining", "minimumAmount"], { "column": "accountNum", "body": accountNum }).then((results) => {

        return results;
    });

};



