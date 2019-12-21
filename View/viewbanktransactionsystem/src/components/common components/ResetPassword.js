import React, { Component } from 'react'
import { typeConfirm, typePassword, typeUsername } from '../../actions/loginAction'
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

    submit = e => {
        e.preventDefault();
        console.log("TYPED", { username: this.props.username, password: this.props.password })
        // this.props.fetchLoggedUser(this.props.username, this.props.password)
        // localStorage.setItem('usertoken', res.data)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <h5>Username: </h5>
                    <input onChange={this.usernamechange} name="username" type="text" placeholder="Username" />
                    <h5>Password: </h5>
                    <input onChange={this.passwordchange} name="password" type="password" />
                    <h5>Confirm: </h5>
                    <input onChange={this.confirmchange} name="confirm" type="password" />
                    <button>Login</button>
                </form>
                {/* <div>
                    {this.props.code == 204 ? <p> {this.props.success} </p> : ''}
                </div> */}


                <div>
                </div>
            </div >
        )
    }
}


const mapStatesToProps = state => ({
    username: state.loginUser.username,
    password: state.loginUser.password,
    password: state.loginUser.confirm,
    success: state.loginUser.result,
    code: state.loginUser.code
})
const mapActionToProps = {
    typeUsername: typeUsername,
    typePassword: typePassword,
    typeConfirm: typeConfirm
}

export default connect(mapStatesToProps, mapActionToProps)(ResetPassword)




