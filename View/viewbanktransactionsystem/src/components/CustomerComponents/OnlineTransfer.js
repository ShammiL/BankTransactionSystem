import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails, onlinetransfer } from '../../actions/transactionReducerActions'

export class OnlineTransfer extends Component {

    submit = e => {
        e.preventDefault();

        var details = {
            accountID: this.props.accountNum,
            amount: this.props.amount,
            recievingAccountID: this.props.recieverAccountNum
        }

        this.props.onlinetransfer({ details })

    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop

    }


    render() {
        return (
            <div>
                <h1>Online Money Transfer</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <h5>Account Number: </h5>
                        <input onChange={this.change} name="accountNum" type="text" placeholder="Account Number" />
                        <h5>Amount: </h5>
                        <input onChange={this.change} name="amount" type="text" placeholder="Enter amount here" />
                        <h5>Receiving Account Number: </h5>
                        <input onChange={this.change} name="recieverAccountNum" type="text" placeholder="Account Number" />
                        <h1></h1>
                        <button type="submit">Proceed Transfer</button>
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
    recieverAccountNum: state.transactionReducer.recieverAccountNum,
    error: state.transactionReducer.error

})
const mapActionToProps = {
    typeDetails: typeDetails,
    onlinetransfer: onlinetransfer,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(OnlineTransfer)