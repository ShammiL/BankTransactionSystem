import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails, offlineWithdrawal } from '../../actions/transactionReducerActions'

export class OfflineWithdrawal extends Component {

    submit = e => {
        e.preventDefault();

        var details = {
            accountID: this.props.accountNum,
            amount: this.props.amount,
            customerID: this.props.customerID,
        }

        this.props.offlineWithdrawal({ details })

    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }


    render() {
        return (
            <div>
                <h1>Offline Withdrawal Form</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <h5>Account Number: </h5>
                        <input onChange={this.change} name="accountNum" type="text" placeholder="Account Number" />
                        <h5>Customer Username: </h5>
                        <input onChange={this.change} type="text" name="customerID" placeholder="Customer ID" />

                        <h5>Amount: </h5>

                        <input onChange={this.change} name="amount" type="text" placeholder="Enter amount here" />
                        <h1></h1>
                        <button type="submit">Proceed Withdrawal</button>
                    </form>
                    <p>{this.props.error}</p>
                </div>
            </div>
        )
    }
}


const mapStatesToProps = state => ({
    accountNum: state.transactionReducer.accountNum,
    amount: state.transactionReducer.amount,
    customerID: state.transactionReducer.customerID,
    error: state.transactionReducer.error

})
const mapActionToProps = {
    typeDetails: typeDetails,
    offlineWithdrawal: offlineWithdrawal
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(OfflineWithdrawal)