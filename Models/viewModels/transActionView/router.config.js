transController = require("./transactionViewController")

exports.routesConfig = function (app) {
    app.get('/employee/transactionView/:type', [
        transController.getAllEmployee
    ]);

    app.get('/manager/transactionView/:type', [
        transController.getAllManager
    ]);
    app.post('/manager/report/:type', [
        transController.getReport
    ]);

}