import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails } from '../../actions/transactionReducerActions'

export class OfflineWithdrawal extends Component {

    submit = e => {
        e.preventDefault();
        console.log("Withdrawal Types", { username: this.props.accountNum, password: this.props.amount })
        // this.props.fetchLoggedUser(this.props.username, this.props.password)
        // localStorage.setItem('usertoken', res.data)
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
                        <h5>Amount: </h5>
                        <input onChange={this.change} name="amount" type="text" placeholder="Enter amount here" />
                        <h1></h1>
                        <button type="submit">Proceed Withdrawal</button>
                    </form>
                </div>
            </div>
        )
    }
}


const mapStatesToProps = state => ({
    accountNum: state.transactionReducer.accountNum,
    amount: state.transactionReducer.amount,

})
const mapActionToProps = {
    typeDetails: typeDetails,
    // typePassword: typePassword,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(offlineDeposite)