Db = require('../../DB')
eventNames = require('../eventNames/eventNames')

var connection = Db.mysqlConnection
// var procedureName = eventNames.individualcustomerLogin;

async function individualCustomerLogin(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12) {
    const result = await connection.query("call " + eventNames.individualcustomerLogin + "(?,?,?,?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}

async function childCustomerLogin(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12) {
    const result = await connection.query("call " + eventNames.childCustomerRegister + "(?,?,?,?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}

async function companycustomerLogin(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10) {
    const result = await connection.query("call " + eventNames.companycustomerLogin + "(?,?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}

async function managerRegisterProcedure(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15) {
    console.log(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15)
    const result = await connection.query("call " + eventNames.managerRegister + "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function createAccountCustomer(data1, data2, data3, data4, data5 = 0, data6 = 0, data7, data8, data9) {
    const result = await connection.query("call " + eventNames.accountForCustomer + "(?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9]);
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
async function approveLoan(data1, data2, data3, data4, data5, data6, data7, data8) {
    const result = await connection.query("call " + eventNames.approveLoan + "(?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8]);
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
    const result = await connection.query("call " + eventNames.makeOfflineDeposite + "(?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function onlineTransfer(data1, data2, data3, data4, data5, data6, data7, data8) {
    const result = await connection.query("call " + eventNames.onlineTransfer + "(?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}

async function withdrawalAccount(data1, data2, data3, data4, data5, data6, data7) {
    const result = await connection.query("call " + eventNames.withdrawalAccount + "(?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}

async function updateIndividualCustomer(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12) {
    const result = await connection.query("call " + eventNames.individualcustomerUpdate + "(?,?,?,?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function managerRegisterUpdate(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15) {
    const result = await connection.query("call " + eventNames.managerRegisterUpdate + "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
async function companycustomerUpdate(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10) {
    const result = await connection.query("call " + eventNames.companycustomerUpdate + "(?,?,?,?,?,?,?,?,?,?)", [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", result)
    return result
}
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
module.exports.updateIndividualCustomer = updateIndividualCustomer;
module.exports.managerRegisterUpdate = managerRegisterUpdate;
module.exports.companycustomerUpdate = companycustomerUpdate;
module.exports.childCustomerLogin = childCustomerLogin;