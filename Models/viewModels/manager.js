view = require("../../Core/databaseEvents/Views/views.js");

exports.getByUsername = (data) => {
    console.log("data", data)
    return view.managerview(data).then((results) => {
        return results;
    });

};


