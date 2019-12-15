savingViewController = require('./savingViewController');

exports.routesConfig = function (app) {
    app.get('/SavingViewDetails', [
        savingViewController.getDetails
    ]);
    app.get('/SavingViewDetails/:type', [
        savingViewController.getByType
    ]);
    app.get('/SavingViewDetails/account/:accountNum', [
        savingViewController.getByAccount
    ]);
    app.get('/SavingViewDetails/customer/:customerID', [
        savingViewController.getByCustomer
    ]);

}