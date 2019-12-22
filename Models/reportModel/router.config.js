ReportController = require('./reportController');

exports.routesConfig = function (app) {
    app.get('/fullReport', [
        ReportController.getAll
    ]);
    app.get('/monthlyReport', [
        ReportController.getByDate
    ]);
    

}