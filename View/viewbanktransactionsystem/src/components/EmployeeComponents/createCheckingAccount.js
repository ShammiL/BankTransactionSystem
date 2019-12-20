import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails } from '../../actions/newAccountReducer'



export class createCheckingAccount extends Component {
    submit = e => {
        e.preventDefault();
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
                </div>
            </div>
        )
    }

}

const mapStatesToProps = state => ({
    branchID: state.newAccountReducer.branch,
    customerID: state.newAccountReducer.customerID


})
const mapActionToProps = {
    typeDetails: typeDetails,
    // typePassword: typePassword,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(createCheckingAccount)

