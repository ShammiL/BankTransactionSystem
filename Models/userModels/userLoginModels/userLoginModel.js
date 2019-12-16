Db = require("../../../Core/DB.js");

var table = "login";
var ID = "username";//primary key



exports.getByUsername = (id) => {
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
// this.getByUsername(7);


exports.update = (id, data) => {

    return Db.updatedata(table, { "column": ID, "value": id, "body": data }).then((results) => {

        return results;
    });

};