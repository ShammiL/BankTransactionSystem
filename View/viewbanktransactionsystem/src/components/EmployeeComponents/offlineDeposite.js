import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails, offlineDeposite } from '../../actions/transactionReducerActions'


export class offlineDeposite_ extends Component {


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
                <h1>Offline Deposit Form</h1>
                <form onSubmit={this.submit}>
                    <h5>Account Number: </h5>
                    <input onChange={this.change} name="accountNum" type="text" placeholder="Username" />
                    <h5>Amount: </h5>
                    <input onChange={this.change} name="amount" type="text" />
                    <button>Deposit</button>
                </form>
                <p>{this.props.error}</p>
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

export default connect(mapStatesToProps, mapActionToProps)(offlineDeposite_)

