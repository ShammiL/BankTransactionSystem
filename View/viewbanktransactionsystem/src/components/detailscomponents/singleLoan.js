import React, { Component } from 'react'
import axios from 'axios'
import Divider from '@material-ui/core/Divider';

export default class singleLoan extends Component {


    constructor(props) {
        super(props);
        this.state = { getRemaining: 0 }
    }

    componentDidMount() {

        axios.get("http://localhost:5000/loan/remainingAmount/" + this.props.loanNum).then((res) => {
            this.setState({ getRemaining: res.data })
        })

    }

    render() {
        return (
            <div>
                <p>loanNum: {this.props.loanNum}</p>
                <p>dateTaken: {this.props.dateTaken}</p>
                <p>customerID: {this.props.customerID}</p>
                <p>amount: {this.props.amount}</p>
                <p>duration: {this.props.duration}</p>
                <p>monthlyInstallment:{this.props.monthlyInstallment}</p>
                <p>getRemaining:{this.state.getRemaining}</p>
                <Divider />
            </div>
        )
    }
}
