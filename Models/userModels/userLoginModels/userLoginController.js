UserModel = require("./userLoginModel.js");
userdata = require("../../viewModels/index");

hashFunctions = require("../../../Functions/functions")

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
                console.log("Login password", results[0].password)
                hashFunctions.checkhash(password, results[0].password).then((result) => {
                    console.log("RESULT", result)
                    if (result) {
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

                })

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


exports.changePassword = (req, res) => {

    var username = req.body.details.username;
    var password = req.body.details.password;
    var newpassword = req.body.details.newpassword;
    var confirm = req.body.details.confirm;
    if (newpassword === confirm) {

        UserModel.getByUsername(username)
            .then((user) => {
                console.log("user", user)
                if (user.length <= 0) {
                    res.send({
                        "code": 204,
                        "success": "Username doesn't match"
                    });

                }
                else {
                    hashFunctions.checkhash(password, user[0].password).then((result) => {
                        if (!result) {
                            res.send({
                                "code": 204,
                                "success": "Password doesn't match"
                            });
                        }
                        else {
                            hashFunctions.hashPassword(newpassword).then((hash) => {
                                UserModel.update(user[0].username,
                                    {
                                        "password": hash
                                    }).then((result) => {
                                        res.send({
                                            result
                                        })
                                    })
                            })


                        }
                    })
                }
            })

    }
    else {

        res.send({
            "code": 204,
            "success": "Password and confirm password doesn't match"
        });

    }

}
