const config = require('./Config/config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
// app.use(cors());

// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const loginRouter = require('./Models/userModels/userLoginModels/routes.config');
const employeeRouter = require('./Models/userModels/employees/routes.config');
const customerRouter = require('./Models/userModels/customers/routes.config');
const managerRouter = require('./Models/userModels/managerModel/route.config');
const accountRouter = require('./Models/accountModel/router.config');
const LoanRouter = require('./Models/loanModel/router.config');
const FDRouter = require('./Models/FDModel/route.config');
const transactionRouter = require('./Models/viewModels/transActionView/router.config');
const savingViewRouter = require('./Models/viewModels/savingView/router.config');
const FDViewRouter = require('./Models/viewModels/FDView/router.config');
const reportViewRouter = require('./Models/reportModel/router.config');
const allAccountRouter = require('./Models/allAccountModel/router.config');


app.use(bodyParser.json());
// AuthorizationRouter.routesConfig(app);
loginRouter.routesConfig(app);
transactionRouter.routesConfig(app);
employeeRouter.routesConfig(app);
customerRouter.routesConfig(app);
LoanRouter.routesConfig(app);
managerRouter.routesConfig(app);
accountRouter.routesConfig(app);
FDRouter.routesConfig(app);
savingViewRouter.routesConfig(app);
FDViewRouter.routesConfig(app);
reportViewRouter.routesConfig(app);
allAccountRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
