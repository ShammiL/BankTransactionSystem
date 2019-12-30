import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails, createfdaccount } from '../../actions/newAccountReducer'

export class createFD extends Component {

    submit = e => {
        e.preventDefault();

        var details = {
            customerID: this.props.customerID,
            FDType: this.props.fdtype,
            accountID: this.props.accountID,
            amount: this.props.amount
        }

        this.props.createfdaccount({ details })

    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }


    render() {
        return (
            <div>
                <h1>New Fixed Deposit Form</h1>
                <form onSubmit={this.submit}>

                    <h5>Customer Username: </h5>
                    <input onChange={this.change} type="text" name="customerID" placeholder="Customer ID" />


                    <h5>Associated Savings Account Number: </h5>
                    <input onChange={this.change} type="text" name="accountID" placeholder="Account Number" />

                    <h5>Deposit Period: </h5>
                    <select name="fdtype" onChange={this.change}>
                        <option value="A">6 months</option>
                        <option value="B">1 year</option>
                        <option value="C">3 years</option>
                    </select>

                    <h5>Deposit Amount: </h5>
                    <input onChange={this.change} type="text" name="amount" placeholder="Amount" />

                    <h1></h1>
                    <button type="submit">Open Fixed Deposit</button>
                </form>
                <p>{this.props.error}</p>
            </div>
        )
    }
}
const mapStatesToProps = state => ({
    accountID: state.newAccountReducer.accountID,
    amount: state.newAccountReducer.amount,
    customerID: state.newAccountReducer.customerID,
    fdtype: state.newAccountReducer.fdtype,
    error: state.newAccountReducer.error

})
const mapActionToProps = {
    typeDetails: typeDetails,
    createfdaccount: createfdaccount,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(createFD)

