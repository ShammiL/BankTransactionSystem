import { Component } from 'react';

/**
 * interest rate eka controller ekata ganiddi 0.01 n guna karala ganna one neda?
 * Meke duration kianne mokadda? FDType ekama nemeda?
 */

export class changeInterestRates extends Component {
    render(){
        return (
            <div>
                <h1>Change Interest Rate</h1>
                <form onSubmit = {this.submit}>
                    <h5>Customer ID: </h5>
                    <input onChange = {this.change} type = "text" name = "customerID" placeholder = "Customer ID" />

                    <h5>Duration: </h5>
                    <input onChange = {this.change} type = "text" name = "duration" placeholder = "Duration" />

                    <h5>Deposit Period: </h5>
                    <select name="FDType" onChange={this.change}>
                        <option value="A">6 months</option>
                        <option value="B">1 year</option>
                        <option value="C">3 years</option>
                    </select>

                    <h5>Interest Rate: </h5>
                    <p><input onChange = {this.change} type = "text" name = "interest" /> %</p>

                    <h1></h1>
                    <button type = "submit">Save</button>
                </form>
            </div>
        )
    }
}