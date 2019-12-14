Db = require("../../Core/DB.js");

var table = "fixeddeposit";
var ID = "FDNumber";//primary key


exports.getAll = () => {
    return Db.getAll(table).then((results) => {
        return results;
    });

};

exports.getByType = (id) => {

    return Db.getByColumn(table, { "column": "FDType", "body": id }).then((results) => {

        return results;
    });

};

exports.getByID = (id) => {

    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
exports.update = (id, data) => {

    return Db.updatedata(table, { "column": ID, "value": id, "body": data }).then((results) => {

        return results;
    });

};


