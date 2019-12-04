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
    app.put('/customer/update/:userId', [
        CustomerController.update
    ]);
    app.delete('/customer/delete/:userId', [
        CustomerController.delete
    ]);


};