Db = require('../../DB')
eventNames = require('../eventNames/eventNames')

var connection = Db.mysqlConnection
// var procedureName = eventNames.individualcustomerLogin;

async function individualCustomerview(data = { "username": "true" }) {
    console.log(eventNames.individualCustomerview, Object.keys(data), Object.values(data))
    const result = await connection.query("select * from " + eventNames.individualCustomerview + " where " + Object.keys(data)[0] + " = " + "\'" + Object.values(data)[0] + "\'");
    if (!result.length)
        throw new Errors.NotFound('Error');
    return result
}

async function companyCustomerview(data) {
    console.log(eventNames.individualCustomerview, Object.keys(data), Object.values(data))
    const result = await connection.query("select * from " + eventNames.companyCustomerview + " where " + Object.keys(data)[0] + " = " + "\'" + Object.values(data)[0] + "\'");
    if (!result.length)
        throw new Errors.NotFound('Error');
    return result
}

async function managerview(data) {
    console.log(eventNames.individualCustomerview, Object.keys(data), Object.values(data))
    const result = await connection.query("select * from " + eventNames.managerview + " where " + Object.keys(data)[0] + " = " + "\'" + Object.values(data)[0] + "\'");
    if (!result.length)
        throw new Errors.NotFound('Error');
    return result
}
module.exports.managerview = managerview;
module.exports.individualCustomerview = individualCustomerview;
module.exports.companycustomerview = companyCustomerview;