import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails } from '../../actions/transactionReducerActions'


export class offlineDeposite extends Component {


    submit = e => {
        e.preventDefault();
        console.log("Depoesit Types", { username: this.props.accountNum, password: this.props.amount })
        // this.props.fetchLoggedUser(this.props.username, this.props.password)
        // localStorage.setItem('usertoken', res.data)
    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop

    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <h5>AccountNumber: </h5>
                    <input onChange={this.change} name="accountNum" type="text" placeholder="Username" />
                    <h5>Amount: </h5>
                    <input onChange={this.change} name="amount" type="text" />
                    <button>Deposit</button>
                </form>
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

