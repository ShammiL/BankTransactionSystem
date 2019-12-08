company = require("./companyCustomer.js");
individual = require("./individualCustomer.js");
manager = require("./manager.js");
names = require("../../Config/userTypeNames")

exports.type = (data, type) => {
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


