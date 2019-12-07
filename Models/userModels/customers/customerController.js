CustomerModel = require("./customersModel.js");
const jwt = require("jsonwebtoken")
const uuidv4 = require('uuid/v4');
customerProcedures = require('../../../Core/databaseEvents/procedures/procedures')

exports.getById = (req, res) => {
    CustomerModel.getById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getAll = (req, res) => {
    CustomerModel.getAll()
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByEmail = (req, res) => {
    CustomerModel.getByEmail(req.params.email)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.update = (req, res) => {
    console.log(req.params);
    CustomerModel.update(req.body, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.delete = (req, res) => {
    CustomerModel.delete(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    // console.log(req);
    req.body.customerID = uuidv4()
    data = "\'" + req.body.details.email + "\'"
        + "," +
        "\'" + req.body.details.phoneNumber + "\'"
        + "," +
        "\'" + req.body.details.buildingNumber + "\'"
        + "," +
        "\'" + req.body.details.streetName + "\'"
        + ","
        + "\'" + req.body.details.city + "\'"
        + ","
        + "\'" + req.body.details.username + "\'"
        + ","
        + "\'" + req.body.details.password + "\'"
    if (req.body.details.type == "individual") {
        data = "\'" + req.body.customerID + "\'"
            + "," +
            "\'" + req.body.details.firstName + "\'"
            + "," +
            "\'" + req.body.details.lastName + "\'"
            + "," +
            "\'" + req.body.details.nic + "\'"
            + "," + data
            +","+
            "\'" + req.body.details.type + "\'"

        console.log(data)
        customerProcedures.individualCustomerLogin(data)
            .then((result) => {
                console.log("RE", result)
                res.status(200).send(result);
            });
    }
    else {
        data = data = "\'" + req.body.customerID + "\'"
            + "," +
            "\'" + req.body.details.companyName + "\'"
            + "," + data
            +","+
            "\'" + req.body.details.type + "\'"
        console.log(data)
        customerProcedures.companycustomerLogin(data)
            .then((result) => {
                console.log("RE", result)
                res.status(200).send(result);
            });

    }
    // console.log(data)

};

