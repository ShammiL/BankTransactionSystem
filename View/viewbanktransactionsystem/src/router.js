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
import OfflineWithdrawal from './components/EmployeeComponents/OfflineWithdrawal'
import offlineDeposite from './components/EmployeeComponents/offlineDeposite'
import OnlineTransfer from './components/CustomerComponents/OnlineTransfer'
import createFd from './components/EmployeeComponents/createFd'
import createchecking from './components/EmployeeComponents/createCheckingAccount'
import createsaving from './components/EmployeeComponents/createSavingAccount'
import paymonthlyinstallment from './components/EmployeeComponents/payMonthlyInstallment'
import requestofflineloan from './components/EmployeeComponents/requestOfflineLoan'
import ResetPassword from './components/common components/ResetPassword'
import ViewLoan from './components/EmployeeComponents/ViewLoan'


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
                    <Route exact path="/employee/offlinewithdrawal" component={OfflineWithdrawal}></Route>
                    <Route exact path="/employee/offlinedeposit" component={offlineDeposite}></Route>
                    <Route exact path="/employee/onlineTransfer" component={OnlineTransfer}></Route>
                    <Route exact path="/employee/createFd" component={createFd}></Route>
                    <Route exact path="/employee/createCheckingaccount" component={createchecking}></Route>
                    <Route exact path="/employee/createsavingaccount" component={createsaving}></Route>
                    <Route exact path="/employee/paymonthlyinstallement" component={paymonthlyinstallment}></Route>
                    <Route exact path="/user/changePassword" component={ResetPassword}></Route>
                    <Route exact path="/employee/requestofflineloan" component={requestofflineloan}></Route>
                    <Route exact path="/manager/viewLoanDetails" component={ViewLoan}></Route>



                </Router>
            </div>

        )
    }
}
const mapActionToProps = {
    fetchLoggedUser: fetchLoggedUser
}

export default connect(null, mapActionToProps)(router)
