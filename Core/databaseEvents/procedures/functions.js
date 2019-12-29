Db = require('../../DB')
eventNames = require('../eventNames/eventNames')

var connection = Db.mysqlConnection
// var procedureName = eventNames.checkRemainingLoanAmount;

async function checkRemainingLoanAmount(data) {
    const result = await connection.query("select " + eventNames.checkRemainingLoanAmount + "(?)", [data]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", Object.values(result[0][0])[0]);
    return Object.values(result[0][0])[0]
}
// checkRemainingLoanAmount('1234');

async function checkFDInstallment(data) {
    const result = await connection.query("select " + eventNames.checkFDInstallment + "(?)", [data]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", Object.values(result[0][0])[0]);
    return Object.values(result[0][0])[0]
}
// checkFDInstallment('"66b1811b-f"');
// checkFDInstallment('"b192b124-4"');
// // checkFDInstallment('"45880c14-a"');
// checkFDInstallment('"45880c4-a"');

async function checkForonlineLoan(data1, data2) {
    const result = await connection.query("select " + eventNames.checkForonlineLoan + "(?,?)", [data1, data2]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", Object.values(result[0][0])[0]);
    return Object.values(result[0][0])[0]
}

async function checkValidateOfRegister(data1, data2, data3, data4, data5) {
    const result = await connection.query("select " + eventNames.checkValidateOfRegister + "(?,?,?,?,?)", [data1, data2, data3, data4, data5]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", Object.values(result[0][0])[0]);
    return Object.values(result[0][0])[0]
}
async function checkLateLoans(data) {
    const result = await connection.query("select " + eventNames.checkLateLoans + "(?)", [data]);
    if (!result.length)
        throw new Errors.NotFound('Error');
    console.log("RES", Object.values(result[0][0])[0]);
    return Object.values(result[0][0])[0]
}

// checkForonlineLoan("'45880c14-a',6000");
// checkForonlineLoan("'b192b124-4',119");
// checkForonlineLoan("'66b1811b-f',600");

module.exports.checkForonlineLoan = checkForonlineLoan;
module.exports.checkRemainingLoanAmount = checkRemainingLoanAmount;
module.exports.checkFDInstallment = checkFDInstallment;
module.exports.checkValidateOfRegister = checkValidateOfRegister;
module.exports.checkLateLoans = checkLateLoans