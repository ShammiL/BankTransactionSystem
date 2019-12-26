const db = require('../../Core/DB');

var table = "receipt";
var ID = "receiptNum";//primary key

exports.getAll = () => {
    return Db.getAll(table).then((results) => {
        return results;
    });

};

exports.getByDate = (date) => {

    return Db.getByColumn(table,{ "column": "date_", "body": date }).then((results) => {

        return results;
    });

};
// {
//     "column" : date_;
        // "body" : specific Date;
// }