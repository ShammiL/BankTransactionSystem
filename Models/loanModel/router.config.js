LoanController = require('./loanController');

exports.routesConfig = function (app) {
    app.get('/loan/remainingAmount/:loanNum', [
        LoanController.getRemaining
    ]);

}