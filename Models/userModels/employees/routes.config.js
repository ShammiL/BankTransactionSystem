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


};