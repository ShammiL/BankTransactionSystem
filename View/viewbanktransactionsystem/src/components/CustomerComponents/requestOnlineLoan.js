import { Component } from 'react';

export class requestOnlineLoan extends Component {

    render() {
        return (
            <div>
                <h1>Online Loan Request</h1>
                <form onSubmit={this.submit}>
                    <h5>Amount: </h5>
                    <input onChange={this.change} type="text" name="amount" placeholder="Enter amount here" />
                    <h1></h1>
                    <button type = "submit">Proceed Loan Request</button>
                </form>
            </div>
        )
    }

}