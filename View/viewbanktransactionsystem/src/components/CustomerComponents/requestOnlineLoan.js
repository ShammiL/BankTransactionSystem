import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails, requestonlineloan } from '../../actions/loanActions'

export class requestOnlineLoan extends Component {

    submit = e => {
        e.preventDefault();

        var details = {
            customerID: this.props.customerID,
            amount: this.props.amount,
        }

        this.props.requestonlineloan({ details })

    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }

    render() {
        return (
            <div>
                <h1>Online Loan Request</h1>
                <form onSubmit={this.submit}>
                    <h5>Amount: </h5>
                    <input onChange={this.change} type="text" name="amount" placeholder="Enter amount here" />
                    <h1></h1>
                    <button type="submit">Proceed Loan Request</button>
                </form>
                <p>{this.props.error}</p>
            </div>
        )
    }

}

const mapStatesToProps = state => ({
    amount: state.loanReducer.amount,
    customerID: state.activeUser.customerID,
    error: state.loanReducer.error
})
const mapActionToProps = {
    typeDetails: typeDetails,
    requestonlineloan: requestonlineloan,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(requestOnlineLoan)
