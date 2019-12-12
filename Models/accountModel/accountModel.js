Db = require("../../Core/DB.js");

var table = "account";
var ID = "accountNum";//primary key



exports.getByID = (id) => {
    
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
// this.getByUsername(7);


