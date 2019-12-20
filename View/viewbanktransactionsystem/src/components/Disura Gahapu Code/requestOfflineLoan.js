import {Component} from "react";

export class requestOfflineLoan extends Component {

    render() {
        return(
            <div>
                <h1>Loan request form</h1>
                <div>
                    <form onSubmit = {this.submit}>
                        <h5>Employee ID: </h5>
                        <input onChange = {this.change} type = "text" name = "loanOfficerID" placeholder = "Your Employee ID"/>

                        <h5>Branch: </h5>
                        <input onChange = {this.change} type = "text" name = "branchID" placeholder = "Branch name"/>

                        <h5>Customer ID: </h5>
                        <input onChange = {this.change} type = "text" name = "customerID" placeholder = "Customer ID"/>

                        <h5>Amount requested: </h5>
                        <input onChange = {this.change} type = "text" name = "amount" placeholder = "Loan amount"/>

                        <h5>Reason for requesting the loan: </h5>
                        <input onChange = {this.change} type = "text" name = "description"/>

                        <h1></h1>
                        <button type = "submit">Proceed Loan Request</button>
                    </form>
                </div>
            </div>
        )
    }

}