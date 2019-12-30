Db = require("../../Core/DB.js");

var table = "atm";
var ID = "ATMID";//primary key



exports.getBYId = (id) => {
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};

exports.update = (data, id) => {
    return Db.update(table, data, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
exports.getAll = () => {
    return Db.getAll(table).then((results) => {
        return results;
    });

};

// this.getByUsername(7);


