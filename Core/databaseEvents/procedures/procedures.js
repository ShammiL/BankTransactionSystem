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

async function managerRegisterProcedure(data) {
    console.log("Finally in pro", data)
    console.log("call " + eventNames.managerRegister + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.managerRegister + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function createAccountCustomer(data1, data2, data3, data4, data5 = 0, data6 = 0) {

    const result = await connection.query("call " + eventNames.accountForCustomer + "(?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
// createAccountCustomer("'27', 'checking', 'child', '66b1811b-f','',''")
async function addOnlineLoan(data1, data2, data3, data4, data5, data6, data7) {
    const result = await connection.query("call " + eventNames.addOnlineLoan + "(?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function approveLoan(data) {
    console.log("call " + eventNames.approveLoan + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.approveLoan + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function createFDaccount(data1, data2, data3, data4, data5, data6) {
    const result = await connection.query("call " + eventNames.createFDaccount + "(?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}


async function makeOfflineDeposite(data1, data2, data3, data4, data5, data6) {
    console.log("call " + eventNames.makeOfflineDeposite + "(?)")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.makeOfflineDeposite + "(?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function onlineTransfer(data) {
    console.log("call " + eventNames.onlineTransfer + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.onlineTransfer + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}

async function withdrawalAccount(data1, data2, data3, data4, data5, data6) {
    console.log("call " + eventNames.withdrawalAccount + "(?)")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.withdrawalAccount + "(?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
// withdrawalAccount("'9989',170024 ,'9', '','' ,170024")


module.exports.managerRegisterProcedure = managerRegisterProcedure;
module.exports.individualCustomerLogin = individualCustomerLogin;
module.exports.companycustomerLogin = companycustomerLogin;
module.exports.createAccountCustomer = createAccountCustomer
module.exports.addOnlineLoan = addOnlineLoan;
module.exports.approveLoan = approveLoan;
module.exports.createFD = createFDaccount;
module.exports.makeOfflineDeposite = makeOfflineDeposite;
module.exports.onlineTransfer = onlineTransfer;
module.exports.withdrawalAccount = withdrawalAccount;
