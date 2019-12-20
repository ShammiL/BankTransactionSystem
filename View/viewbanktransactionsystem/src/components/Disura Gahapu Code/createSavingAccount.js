import { Component } from "react";

export class createSavingAccount extends Component {

    /**
     * Poddak balanna radio button eke name eka accountType da nikanma type da kiala
     */

    render() {
        return (
            <div>
                <h1>New Savings Account Form</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <h5>Accountholder type: </h5>
                        <input type="radio" name="accountType" value="Adult" onChange={this.change} defaultChecked /> Adult
                        <input type="radio" name="accountType" value="Child" onChange={this.change} /> Child

                        <h5>Branch: </h5>
                        <input onChange={this.change} type="text" name="branchID" placeholder="Branch name" />

                        <h5>Customer ID: </h5>
                        <input onChange={this.change} type="text" name="customerID" placeholder="Customer ID" />

                        {this.props.accountType[0] == "Child" 
                        ? <div>
                            <h5>ID of the Guardian customer: </h5>
                            <input onChange = {this.change} type = "text" name = "guardianID" placeholder = "Guardian Customer ID"/>
                        </div> 
                        : <div></div>
                        }

                        <h1></h1>
                        <button type = "submit">Create Account</button>
                    </form>
                </div>
            </div>
        )
    }

}