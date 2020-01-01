import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SingleTransaction from '../detailscomponents/SingleTransaction'

export class ViewTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: 'deposit',
            transactions: [],
            report: 'transaction',
            content: ''
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/employee/transactionView/" + this.state.search).then((res) => {
            this.setState({
                transactions: res.data
            })
        })
    }


    submit = e => {
        e.preventDefault();
        console.log("http://localhost:5000/manager/report/" + this.state.search)

        if (this.state.report == 'report')
            axios.post("http://localhost:5000/manager/report/" + this.state.search, { date: this.state.content }).then((res) => {
                console.log("http://localhost:5000/manager/report/" + this.state.search)
                this.setState({
                    transactions: res.data
                })
            })
        else
            axios.get("http://localhost:5000/employee/transactionView/" + this.state.search).then((res) => {
                this.setState({
                    transactions: res.data
                })
            })
    }
    change = e => {
        this.setState({
            search: e.target.value
        })

    }
    reportchange = e => {
        this.setState({
            report: 'report'
        })
    }
    Transactionchange = e => {
        this.setState({
            report: 'transaction'
        })
    }
    content = e => {
        this.setState({
            content: e.target.value
        })
    }

    render() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        // console.log(this.state)
        const items = this.state.transactions.map((item, key) =>
            <SingleTransaction
                key={key}
                receiptNum={item.receiptNum}
                accountNum={item.accountNum}
                amount={item.amount}
                date={item.date_}

            />
        );
        return (
            <div>
                <form onSubmit={this.submit}>
                    <button onClick={this.reportchange}>Report</button>
                    <button onClick={this.Transactionchange}>Transaction</button>
                    {this.state.report == 'report' ? <input type="date" required onChange={this.content} name="report" /> : ''}
                    <h5>Accountholder type: </h5>
                    <input type="radio" name="type" value="deposit" onChange={this.change} defaultChecked /> Deposit Transactions
                        <input type="radio" name="type" value="withdrawal" onChange={this.change} /> Withdrawal Transactions
                        <input type="radio" name="type" value="transfer" onChange={this.change} /> Transfer Transactions
                        <button type="submit">Check</button>
                </form>

                <div>
                    {items}
                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    // content: state.searchbar.content
})
const mapActionToProps = {
    // typeDetails: typeDetails,
}

export default connect(mapStatesToProps, mapActionToProps)(ViewTransaction)

