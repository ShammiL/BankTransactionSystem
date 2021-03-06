import React, { Component } from 'react'
import axios from 'axios'
import Divider from '@material-ui/core/Divider';

export default class singleLoan extends Component {


    constructor(props) {
        super(props);
        this.state = { getRemaining: 0, late: '' }
    }

    componentDidMount() {

        axios.get("http://localhost:5000/loan/remainingAmount/" + this.props.loanNum).then((res) => {
            this.setState({ getRemaining: res.data });
            axios.get("http://localhost:5000/loan/getLateDetails/" + this.props.loanNum).then((res) => {
                this.setState({ late: res.data })
            });
        });


    }

    render() {
        return (
            <div>
                <p>Loan ID: {this.props.loanNum}</p>
                <p>Date Taken: {this.props.dateTaken}</p>
                <p>CustomerID: {this.props.customerID}</p>
                <p>Amount: {this.props.amount}</p>
                <p>Duration: {this.props.duration}</p>
                <p>Monthly Installment: {this.props.monthlyInstallment}</p>
                <p>Balance Payable (LKR): {this.state.getRemaining}</p>
                <p>Status: {this.state.late}</p>

                <Divider />
            </div>
        )
    }
}
