import React, { Component } from 'react'

export class OfflineWithdrawal extends Component {
    render() {
        return (
            <div>
                <h1>Offline Withdrawal Form</h1>
                <div>
                    <form onSubmit = {this.submit}>
                        <h5>Account Number: </h5>
                        <input onChange = {this.change} name = "accountID" type = "text" placeholder = "Account Number" />
                        <h5>Amount: </h5>
                        <input onChange = {this.change} name = "amount" type = "text" placeholder = "Enter amount here" />
                        <h1></h1>
                        <button type = "submit">Proceed Withdrawal</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default OfflineWithdrawal;
