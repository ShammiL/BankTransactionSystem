const config = require('./Config/config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
