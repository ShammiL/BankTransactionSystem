Db = require("../../../Core/DB");

var table1 = "depositereceipts"
var table2 = "withdrawalreceipts"
var table3 = "transferreceipts"

exports.getAllD = () => {
    return Db.getAll(table1).then((results) => {
        return results;
    });

};
exports.getAllW = () => {
    return Db.getAll(table2).then((results) => {
        return results;
    });

};
exports.getAllT = () => {
    return Db.getAll(table3).then((results) => {
        return results;
    });

};

exports.getByDateD = (date__) => {

    return Db.getByColumn(table1, { "column": "date_", "body": date__ }).then((results) => {

        return results;
    });

};
exports.getByDateW = (date__) => {

    return Db.getByColumn(table2, { "column": "date_", "body": date__ }).then((results) => {

        return results;
    });

};
exports.getByDateT = (date__) => {

    return Db.getByColumn(table3, { "column": "date_", "body": date__ }).then((results) => {

        return results;
    });

};
exports.getByDateAndMonthD = (year__, month__) => {
    console.log("MONTH", month__, year__)
    return Db.getByTwoColumn(table1, { "column1": "MONTH(date_)", "column2": "YEAR(date_)", "body1": month__, "body2": year__ }).then((results) => {

        return results;
    });

};
exports.getByDateAndMonthW = (date__, month__) => {

    return Db.getByTwoColumn(table2, { "column1": "MONTH(date_)", "column2": "YEAR(date_)", "body1": month__, "body2": date__ }).then((results) => {

        return results;
    });

};
exports.getByDateAndMonthT = (date__, month__) => {

    return Db.getByTwoColumn(table3, { "column1": "MONTH(date_)", "column2": "YEAR(date_)", "body1": month__, "body2": date__ }).then((results) => {

        return results;
    });

};


