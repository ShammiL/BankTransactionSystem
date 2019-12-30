import React, { Component } from 'react'
import axios from 'axios'
import SingleAccount from './singleAccount'
import { connect } from 'react-redux'

export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = { accounts: [] }
    }


    componentDidMount() {
        if (this.props.type == "manager")
            axios.get("http://localhost:5000/accounts").then((res) => {
                this.setState({ accounts: res.data })
                console.log(this.state.accounts)
            })
        if (this.props.customerID !== '')
            console.log("CUSTOMER", "http://localhost:5000/account/" + this.props.customerID)
        axios.get("http://localhost:5000/account/" + this.props.customerID).then((res) => {
            this.setState({ accounts: res.data })
            console.log(this.state.accounts)
        })
    }


    render() {
        const items = this.state.accounts.map((item, key) =>
            <SingleAccount
                key={key}
                customerID={item.customerID}
                balance={item.balance}
                accountNum={item.accountNum}
                branch={item.branchID}
            />
        );
        return (
            <div>
                <h1>Details of Bank Accounts associated to your User Account</h1>
                {items}
            </div>
        )
    }
}


const mapStatesToProps = state => ({
    type: state.activeUser.type,
    username: state.activeUser.username,
    customerID: state.activeUser.customerID,
})

export default connect(mapStatesToProps, {})(Account)

