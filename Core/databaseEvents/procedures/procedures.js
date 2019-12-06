Db = require('../../DB')
eventNames = require('../eventNames/eventNames')

var connection = Db.mysqlConnection
var procedureName = eventNames.individualcustomerLogin;

async function individualCustomerLogin(data) {
    console.log("call " + procedureName + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + procedureName + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}


module.exports.individualCustomerLogin = individualCustomerLogin;