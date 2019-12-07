UserModel = require("./userLoginModel.js");
userdata = require("../../viewModels/index");

const jwt = require("jsonwebtoken")
const config = require("../../../Config/config")

exports.getByUsername = (req, res) => {
    UserModel.getByUsername(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};





exports.login = function (req, res) {
    console.log("My req", req.body);
    var username = req.body.username;
    var password = req.body.password;
    UserModel.getByUsername(username)
        .then((results) => {
            if (results.length > 0) {
                if (results[0].password == password) {
                    const TOKEN_SECRECT = config.TOKEN_SECRECT;
                    userdata.type(results[0].username, results[0].accessType)
                        .then((result) => {
                            var data = result[0][0]

                            let token = jwt.sign(data, TOKEN_SECRECT, {
                                expiresIn: 1440
                            });
                            console.log("TOKEN", token)
                            res.header('auth-token', token)
                            res.send({
                                "user": data,
                                'token': token,
                                "code": 200,
                                "success": "login sucessfull"
                            });
                        })

                    // const token = jwt.sign({ _id: results[0].userId }, TOKEN_SECRECT)
                    // res.header('auth-token', token)

                }
                else {
                    res.send({
                        "code": 204,
                        "success": "username and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "username does not exits"
                });
            }

        });
}

exports.logout = function (req, res) {
    res.send("deleted user");
}
