import React, { Component } from 'react'
import { typeUsername, typePassword, fetchLoggedUser } from '../actions/loginAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Home from './Home'


class LoginForm extends Component {



    usernamechange = e => {
        this.props.typeUsername(e.target.value); //connect connect this prop
    }
    passwordchange = e => {
        this.props.typePassword(e.target.value); //connect connect this prop
    }
    submit = e => {
        e.preventDefault();
        console.log("TYPED", { username: this.props.username, password: this.props.password })
        this.props.fetchLoggedUser(this.props.username, this.props.password)

    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <h5>Username: </h5>
                    <input onChange={this.usernamechange} name="username" type="text" placeholder="Username" />
                    <h5>Password: </h5>
                    <input onChange={this.passwordchange} name="password" type="password" />
                    <button>Login</button>
                </form>
                <div>
                    {this.props.code == 204 ? <p> {this.props.success} </p> : ''}
                </div>
                <Link to={'/employee/register'}>
                    <button>
                        Register as a employee
                    </button>

                </Link>
                <div>
                    <Link to={'/customer/register/individual'}>
                        <button>
                            Register as a customer
                        </button>
                    </Link>
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
    success: state.loginUser.result,
    code: state.loginUser.code
})
const mapActionToProps = {
    typeUsername: typeUsername,
    typePassword: typePassword,
    fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(LoginForm)




