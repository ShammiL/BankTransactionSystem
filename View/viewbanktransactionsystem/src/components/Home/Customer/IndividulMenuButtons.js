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
                <Link to={'/employee/onlineTransfer'}>
                    <IconButton color='inherit' onClick={e => { }}>Online Transfer</IconButton>
                </Link>
                <Divider />
                <Link to={'/cusomer/online/loanRequest'}>
                    <IconButton color='inherit' onClick={e => { }}>Online Loan Request</IconButton>
                </Link>
                <Divider />
                <Link to={'/customer/viewAccount'}>
                    <IconButton color='inherit' onClick={e => { }}>View account Details</IconButton>
                </Link>
                <Link to={'/loan/getLoans/'}>
                    <IconButton color='inherit' onClick={e => { }}>View Loan Details</IconButton>
                </Link>
                <Divider />
                <Link to={'/'}>
                    <IconButton color='inherit' onClick={e => { }}>View/update profile</IconButton>
                </Link>
                <Divider />






            </div>
        )
    }
}

const mapStatesToProps = state => ({
})
const mapActionToProps = {
}

export default connect(mapStatesToProps, mapActionToProps)(MenuButtons)




