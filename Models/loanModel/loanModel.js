Db = require("../../Core/DB.js");

var table = "loan";
var ID = "loanNum";//primary key
functions = require("../../Core/databaseEvents/procedures/functions")

exports.getAll = () => {
    return Db.getAll(table).then((results) => {
        return results;
    });

};

//abc
exports.getById = (id) => {
    console.log("CUSTOMER SEARCHING ID", id)
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};

exports.getByCustomerId = (id) => {
    console.log("CUSTOMER SEARCHING ID", id)
    return Db.getByColumn(table, { "column": "customerID", "body": id }).then((results) => {

        return results;
    });

};
// this.getById(7);
exports.getLateDetails = (id) => {
    return functions.checkLateLoans(id).then((results) => {

        return results;
    });

};

exports.getRemainingLoanAmount = (id) => {
    return functions.checkRemainingLoanAmount(id).then((results) => {

        return results;
    });

};

exports.getByEmail = (email) => {
    return Db.getByColumn(table, { "column": 'email', "body": email }).then((results) => {

        return results;
    });

};
// this.getByEmail('sasindu.17@cse.mrt.ac.lk');

exports.update = (data, filter) => {
    return Db.update(table, data, { "column": ID, "body": filter }).then((results) => {

        return results;
    });

};
// this.update({ 'email': 'sasindu.17@cse.mrt.ac.lk', 'password': 1111, }, 4);


exports.delete = (id) => {
    return Db.delete(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
// this.delete(4);


exports.insert = (data) => {
    console.log("data", data);
    return Db.insert(table, data).then((results) => {

        return results;
    });

};
// this.insert([4, 'a', 'b', 'a', 'b', 'a', 'b', 'd']);