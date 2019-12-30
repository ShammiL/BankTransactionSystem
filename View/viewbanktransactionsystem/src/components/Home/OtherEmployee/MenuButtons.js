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
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Create Customer Account</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Offline Deposite</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Offline Withdrawal</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Create Saving Account</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Create Checking Account</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Request Offline Loan</IconButton>
                </Link>
                <Divider />
                <Link to={'/accounts/viewAccountDetails'}>
                    <IconButton color='inherit' onClick={e => { }}>View Accounts</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>Reset Password</IconButton>
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




