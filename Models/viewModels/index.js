company = require("./companyCustomer.js");
individual = require("./individualCustomer.js");
manager = require("./manager.js");

exports.type = (data, type) => {
    console.log(type, data)
    if (type == "manager") {
        return manager.getByUsername({ "username": data }).then((results) => {
            results[0][0] = {
                ...results[0][0],
                customerID: '',
                error: '',
                type: 'manager',

            }
            return results;
        });
    }
    if (type == "individual") {
        console.log('index')
        return individual.getByUsername({ "username": data }).then((results) => {
            results[0][0] = {
                ...results[0][0],
                employeeID: '',
                error: '',
                type: 'company',
                companyName: '',
                salary: '',
                designation: '',
                branchID: ''

            }
            console.log("mmmmmmmm", results[0][0])
            return results;
        });
    }
    if (type == "company") {
        return company.getByUsername({ "username": data }).then((results) => {

            results[0][0] = {
                ...results[0][0],
                companyName: results[0][0].name,
                employeeID: '',
                firstName: '',
                lastName: '',
                nic: '',
                error: '',
                type: 'individual',
                salary: '',
                designation: '',
                branchID: ''

            }

            return results;
        });
    }


};


