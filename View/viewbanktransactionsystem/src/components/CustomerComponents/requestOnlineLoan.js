import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails } from '../../actions/loanActions'

export class requestOnlineLoan extends Component {

    submit = e => {
        e.preventDefault();
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
            </div>
        )
    }

}

const mapStatesToProps = state => ({
    amount: state.loanReducer.amount,
    customerID: state.activeUser.customerID
})
const mapActionToProps = {
    typeDetails: typeDetails,
    // typePassword: typePassword,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(requestOnlineLoan)
