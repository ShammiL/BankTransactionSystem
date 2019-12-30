import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails, createcheckingaccount } from '../../actions/newAccountReducer'



export class createCheckingAccount extends Component {
    submit = e => {
        e.preventDefault();

        var details = {
            customerID: this.props.customerID,
            branchID: this.props.branchID,
            type: 'checking'

        }

        this.props.createcheckingaccount({ details })

    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }


    render() {
        return (
            <div>
                <h1>New Checking Account Form</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <h5>Branch: </h5>
                        <input onChange={this.change} type="text" name="branchID" placeholder="Branch name" />

                        <h5>Customer Username: </h5>
                        <input onChange={this.change} type="text" name="customerID" placeholder="Customer ID" />

                        <h1></h1>
                        <button type="submit">Create Account</button>
                    </form>
                    <p>{this.props.error}</p>
                </div>
            </div>
        )
    }

}

const mapStatesToProps = state => ({
    branchID: state.newAccountReducer.branchID,
    customerID: state.newAccountReducer.customerID,
    error: state.newAccountReducer.error


})
const mapActionToProps = {
    typeDetails: typeDetails,
    createcheckingaccount: createcheckingaccount,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(createCheckingAccount)

