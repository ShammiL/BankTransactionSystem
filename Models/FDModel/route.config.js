FDController = require('./FDModelController');

exports.routesConfig = function (app) {
    app.get('/FDaccounts', [
        FDController.getAll
    ]);
    app.get('/FDaccount/:FDNumber', [
        FDController.getbyID
    ]);
    app.put('/FDaccount/update', [
        FDController.update
    ]);

}