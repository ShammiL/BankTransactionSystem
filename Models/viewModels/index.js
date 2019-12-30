company = require("./companyCustomer.js");
individual = require("./individualCustomer.js");
manager = require("./manager.js");
names = require("../../Config/userTypeNames")
employee = require("../userModels/employees/employeesModel")

exports.type = (data, type) => {
    console.log("MYTYPEUPTOTHIS", data)
    if (type == names.manageremployee) {
        return manager.getByUsername({ "username": data }).then((results) => {
            results[0][0] = {
                ...results[0][0],
                customerID: '',
                error: '',
                type: names.manageremployee,

            }
            return results;
        });
    }
    if (type == names.other) {
        return employee.getByUsername({ "username": data }).then((results) => {
            console.log("RESULTS IN MODEL", results)
            results[0] = {
                ...results[0],
                customerID: '',
                error: '',
                type: names.other,

            }
            console.log(results)
            return results;
        });
    }
    if (type == names.individualcustomer) {
        return individual.getByUsername({ "username": data }).then((results) => {
            results[0][0] = {
                ...results[0][0],
                employeeID: '',
                error: '',
                type: names.individualcustomer,
                companyName: '',
                salary: '',
                designation: '',
                branchID: ''

            }
            return results;
        });
    }
    if (type == names.companycustomer) {
        return company.getByUsername({ "username": data }).then((results) => {
            results[0][0] = {
                ...results[0][0],
                companyName: results[0][0].name,
                employeeID: '',
                firstName: '',
                lastName: '',
                nic: '',
                error: '',
                type: names.companycustomer,
                salary: '',
                designation: '',
                branchID: ''
            }
            return results;
        });
    }


};


