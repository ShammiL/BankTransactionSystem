Db = require("../../Core/DB.js");

var table = "fixeddeposittype";
var ID = "FDType";//primary key



exports.getByType = (id) => {
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
// this.getByUsername(7);


