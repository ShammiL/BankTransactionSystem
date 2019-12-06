Db = require('../../DB')
eventNames = require('../eventNames/eventNames')

var connection = Db.mysqlConnection
// var procedureName = eventNames.individualcustomerLogin;

async function individualCustomerLogin(data) {
    console.log("call " + eventNames.individualcustomerLogin + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.individualcustomerLogin + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}

async function companycustomerLogin(data) {
    console.log("call " + eventNames.companycustomerLogin + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.companycustomerLogin + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}


module.exports.individualCustomerLogin = individualCustomerLogin;
module.exports.companycustomerLogin = companycustomerLogin;