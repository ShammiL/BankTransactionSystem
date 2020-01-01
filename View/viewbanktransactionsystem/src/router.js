import React, { Component } from 'react'
import { HashRouter as Router, Route, BrowserRouter } from 'react-router-dom'
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
import ViewTrans from './components/EmployeeComponents/ViewTransaction'
import ViewAccounts from './components/CustomerComponents/ViewAccounts'
import ViewAccount from './components/EmployeeComponents/viewAccount'
// import ViewLoans from './components/CustomerComponents/ViewLoans'
import OnlineLoan from './components/CustomerComponents/requestOnlineLoan'
import simpleDashPage from './components/otherComponents/dashpage'
import Loans from './components/detailscomponents/Loan'
import Requests from './components/detailscomponents/Request'
import changeInterest from './components/ManagerComponents/changeInterestRates'
import Manager from "./Router/managerRouter"
import Employee from "./Router/EmployeeRouter"
import Customer from "./Router/CustomerRouter"


class router extends Component {
    render() {
        const token = localStorage.usertoken
        if (token != null) {
            console.log(token)
            this.props.fetchLoggedUser(token)
        }
        console.log(this.props.userType)
        if (this.props.userType == "manager") {
            var items1 = <div>
                <Manager />
                {/* <Employee /> */}
            </div>

        }
        else if (this.props.userType == "individual" || this.props.userType == "company") {
            var items1 = <div>
                <Customer />
            </div>

        }
        else {
            var items1 = <Employee />
        }
        return (
            <div>

                <BrowserRouter>
                    <AppBar />
                    <Route exact path="/" component={Dashpage} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/simpledashpage" component={simpleDashPage}></Route>

                    {items1}




                </BrowserRouter>

            </div >

        )
    }
}
const mapStatesToProps = state => ({

    userType: state.activeUser.type

})
const mapActionToProps = {
    fetchLoggedUser: fetchLoggedUser,

}

export default connect(mapStatesToProps, mapActionToProps)(router)
