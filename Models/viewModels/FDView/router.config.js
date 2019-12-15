FDViewController = require('./FDViewController');

exports.routesConfig = function (app) {
    app.get('/FDViewDetails', [
        FDViewController.getDetails
    ]);
    app.get('/FDViewDetails/:type', [
        FDViewController.getByType
    ]);
    app.get('/FDViewDetails/account/:accountNum', [
        FDViewController.getByAccount
    ]);
    app.get('/FDViewDetails/FDaccount/:FDNumber', [
        FDViewController.getByFDNumber
    ]);

}