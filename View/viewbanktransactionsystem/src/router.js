import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Dashpage from './components/Dashpage'
import EmployeeRegister from './components/Register/EmployeeRegistration/EmployeeRegister'
import IndividualCustomerRegister from './components/Register/CustomerRegistration/IndividualCustomerRegister'
import Register from './components/Register'
import Home from './components/Home/Home'
import Profile from './components/Home/Profile'
import { fetchLoggedUser } from './actions/activeUserActions'
import { connect } from 'react-redux'
import AppBar from "./components/Home/AppbarDrawer"

class router extends Component {
    render() {
        const token = localStorage.usertoken
        if (token != null) {
            console.log(token)
            this.props.fetchLoggedUser(token)
        }
        return (
            <div>

                <Router>
                    <AppBar />
                    <Route exact path="/" component={Dashpage} />

                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/customer/register/individual" component={IndividualCustomerRegister} />
                    <Route exact path="/employee/register" component={EmployeeRegister} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/home" component={Home} />
                </Router>
            </div>

        )
    }
}
const mapActionToProps = {
    fetchLoggedUser: fetchLoggedUser
}

export default connect(null, mapActionToProps)(router)
