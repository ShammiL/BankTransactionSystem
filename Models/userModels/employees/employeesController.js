EmployeeModel = require("./employeesModel.js");
const jwt = require("jsonwebtoken")
const uuidv4 = require('uuid/v4');

exports.getById = (req, res) => {
    EmployeeModel.getById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getAll = (req, res) => {
    EmployeeModel.getAll()
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByEmail = (req, res) => {
    EmployeeModel.getByEmail(req.params.email)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.update = (req, res) => {
    console.log(req.params);
    EmployeeModel.update(req.body, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.delete = (req, res) => {
    EmployeeModel.delete(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    console.log("BODY", req.body);
    req.body.employeeID = uuidv4()
    EmployeeModel.insert(req.body)
        .then((result) => {
            res.status(200).send(result);
        });
};

