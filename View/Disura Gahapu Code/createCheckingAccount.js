import { Component } from "react";

export class createCheckingAccount extends Component {

    render() {
        return (
            <div>
                <h1>New Checking Account Form</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <h5>Branch: </h5>
                        <input onChange={this.change} type="text" name="branchID" placeholder="Branch name" />

                        <h5>Customer ID: </h5>
                        <input onChange={this.change} type="text" name="customerID" placeholder="Customer ID" />

                        <h1></h1>
                        <button type = "submit">Create Account</button>
                    </form>
                </div>
            </div>
        )
    }

}