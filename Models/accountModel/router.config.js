AccountController = require('./accountController');

exports.routesConfig = function (app) {
    app.get('/accounts', [
        AccountController.getAll
    ]);
    app.get('/account/:customerID', [
        AccountController.getByCustomer
    ]);
    app.get('/account/details/:accountNum', [
        AccountController.getbyID
    ]);
    app.get('/account/close/:accountNum', [
        AccountController.close
    ]);
    app.get('/account/reopen/:accountNum', [
        AccountController.reopen
    ]);

}