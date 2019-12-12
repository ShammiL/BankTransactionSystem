const EmployeeController = require('./employeesController');


exports.routesConfig = function (app) {
    app.post('/employee/register', [
        EmployeeController.insert
    ]);
    app.get('/employees', [
        EmployeeController.getAll

    ]);
    app.get('/employee/:userId', [
        EmployeeController.getById
    ]);
    app.get('/employee/email/:email', [
        EmployeeController.getByEmail
    ]);
    app.put('/employee/update/:userId', [
        EmployeeController.update
    ]);
    app.delete('/employee/delete/:userId', [
        EmployeeController.delete
    ]);
    app.post('/employee/offlineDeposite', [
        EmployeeController.offlineDeposite
    ]);
    app.post('/employee/offlinewithdrawal', [
        EmployeeController.offlineWithdrawal
    ]);
    app.post('/employee/create/saving', [
        EmployeeController.createSavingAccount
    ]);
    app.post('/employee/create/checking', [
        EmployeeController.createCheckingAccount
    ]);
    app.post('/employee/requestOfflineLoan', [
        EmployeeController.requestOfflineLoan
    ]);
    app.post('/employee/payMonthlyInstallement', [
        EmployeeController.PayMonthlyInstallement
    ]);
    app.post('/employee/createFD', [
        EmployeeController.createFD
    ]);


};