import React, { Component } from 'react'
import { typeConfirm, typePassword, typeUsername, typenewPassword, changepassword } from '../../actions/loginAction'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Home from './Home/Home'


class ResetPassword extends Component {

    usernamechange = e => {
        this.props.typeUsername(e.target.value); //connect connect this prop
    }
    passwordchange = e => {
        this.props.typePassword(e.target.value); //connect connect this prop
    }
    confirmchange = e => {
        this.props.typeConfirm(e.target.value);
    }
    newpasswordchange = e => {
        this.props.typenewPassword(e.target.value); //connect connect this prop
    }

    submit = e => {
        e.preventDefault();

        var details = {
            username: this.props.username,
            password: this.props.password,
            newpassword: this.props.newpassword,
            confirm: this.props.confirm
        }

        this.props.changepassword({ details })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <h5>Username: </h5>
                    <input onChange={this.usernamechange} name="username" type="text" placeholder="Username" />
                    <h5>Password: </h5>
                    <input onChange={this.passwordchange} name="password" type="password" />
                    <h5>New Password: </h5>
                    <input onChange={this.newpasswordchange} name="newpassword" type="password" />
                    <h5>Confirm: </h5>
                    <input onChange={this.confirmchange} name="confirm" type="password" />
                    <button>Change</button>
                </form>
                <div>
                    {this.props.code == 204 ? <p> {this.props.success} </p> : ''}
                </div>


                <div>
                </div>
            </div >
        )
    }
}


const mapStatesToProps = state => ({
    username: state.loginUser.username,
    password: state.loginUser.password,
    confirm: state.loginUser.confirm,
    newpassword: state.loginUser.newpassword,
    success: state.loginUser.result,
    code: state.loginUser.code
})
const mapActionToProps = {
    typeUsername: typeUsername,
    typePassword: typePassword,
    typeConfirm: typeConfirm,
    typenewPassword: typenewPassword,
    changepassword: changepassword
}

export default connect(mapStatesToProps, mapActionToProps)(ResetPassword)




