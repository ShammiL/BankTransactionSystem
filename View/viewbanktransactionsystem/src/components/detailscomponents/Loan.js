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
        console.log(this.props.content)
        var content = this.props.content == '' ? "all" : this.props.content
        if (this.props.type == "manager")
            console.log("http://localhost:5000/loan/getByCustomerId/" + content)
        axios.get("http://localhost:5000/loan/getByCustomerId/" + content).then((res) => {
            this.setState({ loans: res.data })
            console.log(this.state.loans)
        })
        if (this.props.customerID !== '')
            console.log("CUSTOMER", "http://localhost:5000/loan/getByCustomerId/" + this.props.username)
        axios.get("http://localhost:5000/loan/getByCustomerId/" + this.props.username).then((res) => {
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
    username: state.activeUser.username,
    customerID: state.activeUser.customerID,
    content: state.searchbar.content
})

export default connect(mapStatesToProps, {})(Loan)

