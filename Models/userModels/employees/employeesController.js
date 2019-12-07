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
    // console.log("BODY", req.body);
    req.body.employeeID = uuidv4()

    //call managerRegister('employeeIDnum','firstName','lastName','nic','email','phoneNumber','buildingNumber','streetName','city','salary','designation','branchID','nameuser','pass')

    var data = '';
    if (req.body.details.designation == 'manager') {
        data = "\'" + req.body.employeeID + "\'"
            + "," +
            "\'" + req.body.details.firstName + "\'"
            + "," +
            "\'" + req.body.details.lastName + "\'"
            + "," +
            "\'" + req.body.details.nic + "\'"
            + "," +
            "\'" + req.body.details.email + "\'"
            + "," +
            "\'" + req.body.details.phoneNumber + "\'"
            + "," +
            "\'" + req.body.details.buildingNumber + "\'"
            + "," +
            "\'" + req.body.details.streetName + "\'"
            + "," +
            "\'" + req.body.details.city + "\'"
            + "," +
            "\'" + req.body.details.salary + "\'"
            + "," +
            "\'" + req.body.details.designation + "\'"
            + "," +
            "\'" + req.body.details.branchID + "\'"
            + "," +
            "\'" + req.body.details.username + "\'"
            + "," +
            "\'" + req.body.details.password + "\'"
            + "," +
            "\'" + req.body.details.type + "\'"



        EmployeeModel.managerRegisterProcedure(data)
            .then((result) => {
                res.status(200).send(result);
            });
    }
};

