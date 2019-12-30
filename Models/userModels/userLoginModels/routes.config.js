const UsersController = require('./userLoginController');


exports.routesConfig = function (app) {


    app.post('/login', [
        UsersController.login
    ]);

    app.post('/changePassword', [
        UsersController.changePassword
    ]);



};