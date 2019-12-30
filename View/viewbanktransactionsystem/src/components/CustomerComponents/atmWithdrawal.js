import { Component } from 'react';

export class atmWithdrawal extends Component {
    render(){
        return (
            <div>
                <h1>ATM Withdrawal</h1>
                <form onSubmit = {this.submit}>
                    <h5>ATM ID: </h5>
                    <input onChange = {this.change} type = "text" name = "ATMID" placeholder = "ATM ID" />
                    <h5>Account Number: </h5>
                    <input onChange = {this.change} type = "text" name = "accountID" placeholder = "Account Number" />
                    <h5>Amount: </h5>
                    <input onChange = {this.change} type = "text" name = "amount" placeholder = "Amount" />
                    <h1></h1>
                    <button type = "submit">Withdraw</button>
                </form>
            </div>
        )
    }
}