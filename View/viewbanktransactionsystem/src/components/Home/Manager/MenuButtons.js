import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../actions/activeUserActions'
import Divider from '@material-ui/core/Divider'


export class MenuButtons extends Component {
    render() {
        return (
            <div>
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Update User Details</IconButton>
                </Link>
                <Divider />
                <Link to={'/customer/register/individual'}>
                    <IconButton color='inherit' onClick={e => { }}>Create Customer Profiles</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/offlinedeposit'}>
                    <IconButton color='inherit' onClick={e => { }}>Offline Deposite</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/offlinewithdrawal'}>
                    <IconButton color='inherit' onClick={e => { }}>Offline Withdrawal</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/createsavingaccount'}>
                    <IconButton color='inherit' onClick={e => { }}>Create Saving Account</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/createCheckingaccount'}>
                    <IconButton color='inherit' onClick={e => { }}>Create Checking Account</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/requestofflineloan'}>
                    <IconButton color='inherit' onClick={e => { }}>Request Offline Loan</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/paymonthlyinstallement'}>
                    <IconButton color='inherit' onClick={e => { }}>Pay Monthly Installment</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/createFd'}>
                    <IconButton color='inherit' onClick={e => { }}>Create Fixed Deposit Account</IconButton>
                </Link>
                <Divider />
                <Link to={'/manager/viewLoanDetails'}>
                    <IconButton color='inherit' onClick={e => { }}>View Loan</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>View/Change Interest Rates</IconButton>
                </Link>
                <Divider />
                <Link to={'/user/changePassword'}>
                    <IconButton color='inherit' onClick={e => { }}>Reset Password</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Approve Loans</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>View Reports</IconButton>
                </Link>
                <Divider />
                <Link to={'/employee/register'}>
                    <IconButton color='inherit' onClick={e => { }}>Add/Change Employee Profiles</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>View Transactions</IconButton>
                </Link>

            </div>
        )
    }
}

const mapStatesToProps = state => ({
})
const mapActionToProps = {
}

export default connect(mapStatesToProps, mapActionToProps)(MenuButtons)




