import React, { Component } from 'react'
import axios from 'axios'
import Divider from '@material-ui/core/Divider';

export default class singleLoan extends Component {
    constructor(props) {
        super(props);
        this.state = { "error": "" }

    }

    approve = (e) => {
        const confirm = window.confirm("Do you really want to Approve this loan?")

        if (confirm)
            axios.post("http://localhost:5000/manager/approveLoan", {
                "details": {
                    "requestID": this.props.requestID,
                    "managerID": this.props.employeeID,
                }
            }).then((res) => {
                if (res.data.code == 200) {
                    window.location.reload();
                }
                else {
                    this.setState({ "error": res.data.success })
                }

            })
    }



    render() {
        return (
            <div>
                <p>requestID: {this.props.requestID}</p>
                <p>description: {this.props.description}</p>
                <p>amount: {this.props.amount}</p>
                <p>date: {this.props.date}</p>
                <p>loanOfficerID: {this.props.loanOfficerID}</p>
                <p>branchID: {this.props.branchID}</p>
                <p>customerID: {this.props.customerID}</p>
                <button onClick={e => this.approve(e)}>Approve</button>
                <p> {this.state.error} </p>
                <Divider />
            </div >
        )
    }
}
