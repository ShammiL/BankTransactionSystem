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
async function createAccountCustomer(data) {
    console.log("call " + eventNames.accountForCustomer + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.accountForCustomer + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
// createAccountCustomer("'27', 'checking', 'child', '66b1811b-f','',''")
async function addOnlineLoan(data) {
    console.log("call " + eventNames.addOnlineLoan + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.addOnlineLoan + "(" + data + ")");
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
async function createFDaccount(data) {
    console.log("call " + eventNames.createFDaccount + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.createFDaccount + "(" + data + ")");
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}


async function makeOfflineDeposite(data) {
    console.log("call " + eventNames.makeOfflineDeposite + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.makeOfflineDeposite + "(" + data + ")");
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

async function withdrawalAccount(data) {
    console.log("call " + eventNames.withdrawalAccount + "(" + data + ")")
    // console.log("Pro", data)
    const result = await connection.query("call " + eventNames.withdrawalAccount + "(" + data + ")");
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
module.exports.createFDaccount = createFDaccount;
module.exports.makeOfflineDeposite = makeOfflineDeposite;
module.exports.onlineTransfer = onlineTransfer;
module.exports.withdrawalAccount = withdrawalAccount;