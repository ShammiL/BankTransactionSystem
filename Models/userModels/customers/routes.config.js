const CustomerController = require('./customerController');


exports.routesConfig = function (app) {
    app.post('/customer/register', [
        CustomerController.insert
    ]);
    app.get('/customers', [
        CustomerController.getAll

    ]);
    app.get('/customer/:userId', [
        CustomerController.getById
    ]);
    app.get('/customer/email/:email', [
        CustomerController.getByEmail
    ]);
    app.put('/customer/update', [
        CustomerController.update
    ]);
    app.delete('/customer/delete/:userId', [
        CustomerController.delete
    ]);
    app.post('/customer/requestOnlineLoan', [
        CustomerController.requestOnlineLoan
    ]);
    app.post('/customer/onlineTransfer', [
        CustomerController.onlineTransfer
    ]);
    app.post('/customer/atmWithdrawal', [
        CustomerController.atmWithdrawal
    ]);




};