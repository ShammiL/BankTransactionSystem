view = require("../../Core/databaseEvents/Views/views.js");

exports.getByUsername = (data) => {
    console.log("data", data)
    return view.individualCustomerview(data).then((results) => {
        return results;
    });

};


