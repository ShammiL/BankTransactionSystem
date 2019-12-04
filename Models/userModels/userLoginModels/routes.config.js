const UsersController = require('./userLoginController');


exports.routesConfig = function (app) {
    

    app.post('/login', [
        UsersController.login
    ]);

};