const ManagerController = require('./managerController');

exports.routesConfig = function (app) {
    app.post('/manager/approveLoan', [
        ManagerController.approveLoan
    ]);
    
}