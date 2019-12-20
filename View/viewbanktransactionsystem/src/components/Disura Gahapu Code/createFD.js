import { Component } from "react";

export class createFD extends Component{

    /**
     * FDType ekata dila thiyena options wala values hari ewa daanna
     */
    render(){
        return (
            <div>
                <h1>New Fixed Deposit Form</h1>
                <form onSubmit = {this.submit}>
                    <h5>Customer ID: </h5>
                    <input onChange = {this.change} type = "text" name = "customerID" placeholder = "Customer ID" />

                    <h5>Associated Savings Account Number: </h5>
                    <input onChange = {this.change} type = "text" name = "accountID" placeholder = "Account Number" />

                    <h5>Deposit Period: </h5>
                    <select name = "FDType">
                        <option value = "6">6 months</option>
                        <option value = "12">1 year</option>
                        <option value = "36">3 years</option>
                    </select>

                    <h5>Deposit Amount: </h5>
                    <input onChange = {this.change} type = "text" name = "amount" placeholder = "Amount" />

                    <h1></h1>
                    <button type = "submit">Open Fixed Deposit</button>
                </form>
            </div>
        )
    }
}