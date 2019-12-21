const db = require('../../Core/DB');

var table = "reports";
var ID = "receiptNum";//primary key

exports.getAll = () => {
    return Db.getAll(table).then((results) => {
        return results;
    });

};

exports.getByDate = (table,date) => {

    return Db.getByColumn(table, { "column": "date_", "body": date }).then((results) => {

        return results;
    });

};
// {
//     "column" : date_;
        // "body" : specific Date;
// }