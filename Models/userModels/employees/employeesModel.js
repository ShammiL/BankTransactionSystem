Db = require("../../../Core/DB.js");
employeeProcedure = require('../../../Core/databaseEvents/procedures/procedures')

var table = "employee";
var ID = "employeeID";//primary key

exports.getAll = () => {
    return Db.getAll(table).then((results) => {
        return results;
    });

};


exports.getById = (id) => {
    return Db.getByColumn(table, { "column": ID, "body": id }).then((results) => {

        return results;
    });

};
// this.getById(7);

exports.getByEmail = (email) => {
    return Db.getByColumn(table, { "column": 'email', "body": email }).then((results) => {

        return results;
    });

};
exports.getByUsername = (username) => {
    console.log("MOEL", username)
    return Db.getByColumn(table, { "column": 'username', "body": username.username }).then((results) => {

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

exports.managerRegisterProcedure = (data) => {
    console.log("data", data);

    return employeeProcedure.managerRegisterProcedure(data).then((results) => {
        return results;
    });

};
exports.makeOfflineDeposite = (data) => {
    console.log("data", data);

    return employeeProcedure.makeOfflineDeposite(data).then((results) => {
        return results;
    });

};