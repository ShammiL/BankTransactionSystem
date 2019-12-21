import { Component } from 'react';

export class approveLoan extends Component {
    render(){
        return(
            <div>
                <h1>Approve Loan Request</h1>
                <form onSubmit = {this.submit}>
                    <h5>Request ID: </h5>
                    <input onChange = {this.change} type = "text" name = "requestID" placeholder = "Request ID" />
                    <h1></h1>
                    <button type = "submit">Approve Request</button>
                </form>
            </div>
        )
    }
}