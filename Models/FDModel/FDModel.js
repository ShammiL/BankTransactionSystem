Db = require("../../Core/DB.js");

var table = "fixeddeposit";
var ID = "FDNumber";//primary key



exports.getByID = (id) => {

    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
// this.getByUsername(7);


