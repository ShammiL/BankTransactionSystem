import React, { Component } from 'react'
import axios from 'axios'
import SingleLoan from './singleLoan'
import { connect } from 'react-redux'

export class Loan extends Component {

    constructor(props) {
        super(props);
        this.state = { loans: [] }
    }

    componentDidMount() {
        if (this.props.type == "manager")
            axios.get("http://localhost:5000/loan/getByCustomerId/all").then((res) => {
                this.setState({ loans: res.data })
                console.log(this.state.loans)
            })
        if (this.props.customerID !== '')
            console.log("http://localhost:5000/loan/getByCustomerId/" + this.props.customerID)
        axios.get("http://localhost:5000/loan/getByCustomerId/" + this.props.customerID).then((res) => {
            this.setState({ loans: res.data })
            console.log(this.state.loans)
        })
    }


    render() {

        const items = this.state.loans.map((item, key) =>

            <SingleLoan
                key={key}
                customerID={item.customerID}
                amount={item.amount}
                loanNum={item.loanNum}
                dateTaken={item.dateTaken}
                monthlyInstallment={item.monthlyInstallment}
                duration={item.duration}
                getRemaining={item.getRemaining}

            />

        );
        return (
            <div>
                {items}
            </div>
        )
    }
}


const mapStatesToProps = state => ({
    type: state.activeUser.type,
    customerID: state.activeUser.customerID
})

export default connect(mapStatesToProps, {})(Loan)

