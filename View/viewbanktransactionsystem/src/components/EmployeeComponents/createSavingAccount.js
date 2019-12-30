import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails, createsavingaccount } from '../../actions/newAccountReducer'

export class createSavingAccount extends Component {



    submit = e => {
        e.preventDefault();

        var details = {
            customerID: this.props.customerID,
            branchID: this.props.branchID,
            type: 'saving',
            accountType: this.props.accountType,
            guardianID: this.props.guardianID
        }

        this.props.createsavingaccount({ details })

    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }


    /**
     * Poddak balanna radio button eke name eka accountType da nikanma type da kiala
     */

    render() {
        return (
            <div>
                <h1>New Savings Account Form</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <h5>Accountholder type: </h5>
                        <input type="radio" name="accountType" value="Adult" onChange={this.change} defaultChecked /> Adult
                        <input type="radio" name="accountType" value="Child" onChange={this.change} /> Child
                        <input type="radio" name="accountType" value="Senior" onChange={this.change} /> Senior
                        <input type="radio" name="accountType" value="Teen" onChange={this.change} /> Teen


                        <h5>Branch: </h5>
                        <input onChange={this.change} type="text" name="branchID" placeholder="Branch name" />

                        <h5>Customer ID: </h5>
                        <input onChange={this.change} type="text" name="customerID" placeholder="Customer ID" />

                        {this.props.accountType == "Child"
                            ? <div>
                                <h5>ID of the Guardian customer: </h5>
                                <input onChange={this.change} type="text" name="guardianID" placeholder="Guardian Customer ID" />
                            </div>
                            : <div></div>
                        }

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
    accountType: state.newAccountReducer.accountType,
    guardianID: state.newAccountReducer.guardianID,
    error: state.newAccountReducer.error,
    accountType: state.newAccountReducer.accountType


})
const mapActionToProps = {
    typeDetails: typeDetails,
    createsavingaccount: createsavingaccount
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(createSavingAccount)

