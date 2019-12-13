const express = require('express');
const app = express();
const bodyparser = require('body-parser');
var database_Details = require('../Config/config.js');
const mysql = require('mysql2/promise');
app.use(bodyparser.json());//sure that bodyparse allow jsons.

var mysqlConnection = getdatabaseObject(mysql);

function getdatabaseObject(mysql) {
    if (mysqlConnection == null) {
        var mysqlConnection = mysql.createPool({
            host: database_Details.host,
            user: database_Details.databaseUser,
            password: database_Details.databasePassword,
            database: database_Details.databaseName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    return mysqlConnection;
}
//PORT


//get columns

async function getColumns(table) {

    var coloum_list = '';
    const result = await mysqlConnection.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? and table_schema = ?", [table, database_Details.databaseName]);
    if (result[0].length < 1) {
        throw new Error('Error occur when try to get all details');
    }

    for (i = 0; i < result[0].length; i++) {
        coloum_list += "," + result[0][i].COLUMN_NAME;
    }
    coloum_list = coloum_list.slice(1);
    return { "names": coloum_list, "length": result[0].length };

}


async function getAllData(table) {

    const result = await mysqlConnection.query("Select * from " + table);
    if (result[0].length < 1) {
        throw new Error('Error occur when try to get all details');
    }
    return result[0];

}

async function getByColumn(table, param) {
    const result = await mysqlConnection.query("Select * from " + table + " where " + param.column + "= ?", [param.body]);

    if (result.length < 1) {
        throw new Error('Error occur when try to get data by filtering ' + param.body);
    }
    return result[0];
}

async function deleteAdata(table, param) {

    const result = await mysqlConnection.query("delete from " + table + " where " + param.column + "= ?", [param.body]);
    if (result.length < 1) {
        throw new Error('Error occur when try to get data by filtering ' + param.body);
    }
    return result[0];
}


async function insertAdata(table, data) {

    var values = Object.values(data);
    var keys = Object.keys(data);
    var length = values.length;
    var ques = ""
    var columns = ""
    for (i = 0; i < length; i++) {
        columns = columns + "," + keys[i];
        ques = ques + "," + "?";
    }
    ques = ques.slice(1);
    columns = columns.slice(1);
    const result = await mysqlConnection.query("INSERT INTO " + table + " ( " + columns + " ) VALUES (" + ques + ")", values);
    if (result.length < 1) {
        throw new Error('Error occur when try to insert ' + param.body);
    }
    return result[0];

}

async function updateAdata(table, data, params) {

    console.log("data", data);
    console.log("params", params);
    query = '';
    columns = Object.keys(data),
        data = Object.values(data);
    for (i = 0; i < columns.length; i++) {
        query += " , " + columns[i] + " = " + "\"" + data[i] + "\"" + "";
    }
    query = query.slice(3);

    const result = await mysqlConnection.query("UPDATE " + table + " SET " + query + " WHERE " + params.column + " = ?;", [params.body]);
    if (result.length < 1) {
        throw new Error('Error occur when try to get data by filtering ' + param.body);
    }
    return result[0];
}
async function update(table, data) {
    var values = Object.values(data.body);
    var keys = Object.keys(data.body);
    var length = values.length;
    values.push(data.value)
    var columns = ""
    for (i = 0; i < length; i++) {
        columns = columns + "," + keys[i] + " = " + "?"
    }
    columns = columns.slice(1);
    console.log("QUERY", "UPDATE " + table + " SET " + columns + " WHERE " + data.column + " = ?");
    console.log(values)
    const result = await mysqlConnection.query("UPDATE " + table + " SET " + columns + " WHERE " + data.column + " = ?;", values);
    if (result.length < 1) {
        throw new Error('Error occur when try to get data by filtering ' + param.body);
    }
    return result[0];

}




module.exports.mysqlConnection = mysqlConnection;
module.exports.insert = insertAdata;
module.exports.getAll = getAllData;
module.exports.getByColumn = getByColumn;
module.exports.delete = deleteAdata;
module.exports.update = updateAdata;
module.exports.updatedata = update;
































































































































































































// insertAdata('users', [5, 'aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'aa']);

//}

// // getColumns("users");

// //SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'users' and table_schema = 'Se_sem4_Project';

// //get all data

// function getAllData(table, link) {
//     app.get(link, (req, res) => {
//         mysqlConnection.query("Select * from " + table, (err, rows, fields) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 res.send(rows);
//                 console.log(rows)
//             }
//         });
//     });
// }
// // getAllData('users', '/employee');



// //get a data

// function getADataById(table, link, coloum, field = '') {
//     app.get(link, (req, res) => {
//         console.log("Select * from " + table + " where " + coloum + "= ?");
//         mysqlConnection.query("Select * from " + table + " where " + coloum + "= ?", [req.params.id], (err, rows, fields) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 if (field == '') {
//                     res.send(rows);
//                 }

//                 console.log(rows)
//             }
//         });
//     });

// }

// // getADataById('users', '/employee/:id', "userId")

// //delete data


// function deleteAdata(table, link, coloum, field = '') {

//     app.delete(link, (req, res) => {
//         mysqlConnection.query("delete from " + table + " where " + coloum + "= ?", [req.params.id], (err, rows, fields) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 mysqlConnection.query("Select * from " + table, (err, rows, fields) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         res.send(rows);
//                         console.log(rows)
//                     }
//                 });
//             }
//         });
//     });

// }


// // deleteAdata('users', "/employee/:id", 'userId');



// //insert

// //function insertAdata(table, link, data) {

// app.post('/users', (req, res) => {
//     columns = getColumns("users");
//     console.log("Coloumns " + columns);
//     // const { name, code, salary } = req.body;

//     mysqlConnection.query("INSERT INTO " + table + " ( ? ) VALUES ( ? )"
//         , [columns, data], (err, rows, fields) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 mysqlConnection.query("Select * from users", (err, rows, fields) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         res.send(rows);
//                         console.log(rows)
//                     }
//                 });
//             }
//         });
// });
// //}


// //'3', 'aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'aa'


// //update

// function updateData(table, link, coloum, data, releventUpdate, field = '') {
//     app.delete(link, (req, res) => {
//         mysqlConnection.query("UPDATE " + table + " where " + coloum + "= ?", [req.params.id], (err, rows, fields) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 mysqlConnection.query("Select * from " + table, (err, rows, fields) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         res.send(rows);
//                         console.log(rows)
//                     }
//                 });
//             }
//         });
//     });
// }

// // UPDATE`users` SET`password` = 'aaa' WHERE`users`.`userId` = 3;

// app.put('/employee/update/:id', (req, res) => {
//     const { name, code, salary } = req.body;
//     mysqlConnection.query("UPDATE `employee` SET `name` = ?, `code` = ?, `salary` = ? WHERE `employee`.`id` = ?;"
//         , [name, code, salary, req.params.id], (err, rows, fields) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 mysqlConnection.query("Select * from employee", (err, rows, fields) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         res.send(rows);
//                         console.log(rows) // print rows
//                     }
//                 });
//             }
//         });
// });