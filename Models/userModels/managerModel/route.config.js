const ManagerController = require('./managerController');

exports.routesConfig = function (app) {
    app.post('/manager/approveLoan', [
        ManagerController.approveLoan
    ]);
    app.post('/manager/changeInterestRates', [
        ManagerController.changeInterestRates
    ]);
    app.get('/manager/viewRequest', [
        ManagerController.viewRequests
    ]);

}

