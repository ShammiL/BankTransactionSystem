AccountController = require('./accountController');

exports.routesConfig = function (app) {
    app.get('/accounts', [
        AccountController.getAll
    ]);
    app.get('/account/:customerID', [
        AccountController.getbyID
    ]);

}