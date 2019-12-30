LoanController = require('./loanController');

exports.routesConfig = function (app) {
    app.get('/loan/remainingAmount/:loanNum', [
        LoanController.getRemaining
    ]);

    app.get('/loan/getByCustomerId/:customerID', [
        LoanController.getByCustomerId
    ]);
    app.get('/loan/getLateDetails/:loanNum', [
        LoanController.getLateDetails
    ]);


}

