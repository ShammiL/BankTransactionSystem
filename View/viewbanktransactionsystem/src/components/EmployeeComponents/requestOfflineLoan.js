import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails } from '../../actions/loanActions'

export class requestOfflineLoan extends Component {


    submit = e => {
        e.preventDefault();

        var details = {
            accountID: this.props.accountNum,
            amount: this.props.amount
        }

        this.props.offlineDeposite({ details })

    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }



    render() {
        return (
            <div>
                <h1>Loan request form</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <h5>Employee ID: </h5>
                        <input onChange={this.change} type="text" name="loanOfficerID" placeholder="Your Employee ID" />

                        <h5>Branch: </h5>
                        <input onChange={this.change} type="text" name="branchID" placeholder="Branch name" />

                        <h5>Customer ID: </h5>
                        <input onChange={this.change} type="text" name="customerID" placeholder="Customer ID" />

                        <h5>Amount requested: </h5>
                        <input onChange={this.change} type="text" name="amount" placeholder="Loan amount" />

                        <h5>Reason for requesting the loan: </h5>
                        <input onChange={this.change} type="text" name="description" />

                        <h1></h1>
                        <button type="submit">Proceed Loan Request</button>
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
    error: state.transactionReducer.error

})
const mapActionToProps = {
    typeDetails: typeDetails,
    offlineDeposite: offlineDeposite
    // typePassword: typePassword,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(requestOfflineLoan)
