import React, { Component } from 'react'
import { HashRouter as Router, Route, BrowserRouter } from 'react-router-dom'
import Dashpage from '../components/Dashpage'
import EmployeeRegister from '../components/Register/EmployeeRegistration/EmployeeRegister'
import IndividualCustomerRegister from '../components/Register/CustomerRegistration/IndividualCustomerRegister'
import Register from '../components/Register'
import Home from '../components/Home/Home'
import Profile from '../components/Home/Profile'
import { fetchLoggedUser } from '../actions/activeUserActions'
import { connect } from 'react-redux'
import AppBar from "../components/Home/AppbarDrawer"
import OfflineWithdrawal from '../components/EmployeeComponents/OfflineWithdrawal'
import offlineDeposite from '../components/EmployeeComponents/offlineDeposite'
import OnlineTransfer from '../components/CustomerComponents/OnlineTransfer'
import createFd from '../components/EmployeeComponents/createFd'
import createchecking from '../components/EmployeeComponents/createCheckingAccount'
import createsaving from '../components/EmployeeComponents/createSavingAccount'
import paymonthlyinstallment from '../components/EmployeeComponents/payMonthlyInstallment'
import requestofflineloan from '../components/EmployeeComponents/requestOfflineLoan'
import ResetPassword from '../components/common components/ResetPassword'
import ViewLoan from '../components/EmployeeComponents/ViewLoan'
import ViewTrans from '../components/EmployeeComponents/ViewTransaction'
import ViewAccounts from '../components/CustomerComponents/ViewAccounts'
import ViewAccount from '../components/EmployeeComponents/viewAccount'
// import ViewLoans from '../components/CustomerComponents/ViewLoans'
import OnlineLoan from '../components/CustomerComponents/requestOnlineLoan'
import simpleDashPage from '../components/otherComponents/dashpage'
import Loans from '../components/detailscomponents/Loan'
import Requests from '../components/detailscomponents/Request'
import changeInterest from '../components/ManagerComponents/changeInterestRates'
import Manager from "../Router/managerRouter"
import Employee from "../Router/EmployeeRouter"
import Customer from "../Router/CustomerRouter"


export default function managerRouter() {
    return (
        <div>
            <Route exact path="/customer/register/individual" component={IndividualCustomerRegister} />
            <Route exact path="/employee/register" component={EmployeeRegister} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/employee/offlinewithdrawal" component={OfflineWithdrawal}></Route>
            <Route exact path="/employee/offlinedeposit" component={offlineDeposite}></Route>
            <Route exact path="/employee/createFd" component={createFd}></Route>
            <Route exact path="/employee/createCheckingaccount" component={createchecking}></Route>
            <Route exact path="/employee/createsavingaccount" component={createsaving}></Route>
            <Route exact path="/employee/paymonthlyinstallement" component={paymonthlyinstallment}></Route>
            <Route exact path="/user/changePassword" component={ResetPassword}></Route>
            <Route exact path="/employee/requestofflineloan" component={requestofflineloan}></Route>
            <Route exact path="/manager/viewLoanDetails" component={ViewLoan}></Route>
            <Route exact path="/accounts/viewAccountDetails" component={ViewAccount}></Route>
            <Route exact path="/customer/viewAccount" component={ViewAccounts}></Route>
            {/* <Route exact path="/customer/viewLoan" component={ViewLoans}></Route> */}
            <Route exact path="/loan/getLoans" component={Loans}></Route>
            <Route exact path="/manager/LoanRequests" component={Requests}></Route>


            <Route exact path="/manager/view/allAlTransactions" component={ViewTrans}></Route>
            <Route exact path="/manager/changeInterest" component={changeInterest}></Route>


        </div>
    )
}
