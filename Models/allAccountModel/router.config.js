allAccountController = require('./allAccountController');

exports.routesConfig = function (app) {
    app.put('/accountClose', [
        allAccountController.close
    ]);
    
}