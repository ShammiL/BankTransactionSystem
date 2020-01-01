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
            content: '',
            month: '01',
            year: ''
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
        if (this.state.report == 'monthly')
            axios.post("http://localhost:5000/manager/monthlyreport/" + this.state.search, { month: this.state.month, year: this.state.year }).then((res) => {
                this.setState({
                    transactions: res.data
                })
            })
        else
            axios.get("http://localhost:5000/employee/transactionView/" + this.state.search).then((res) => {
                this.setState({
                    transactions: res.data
                })
            })//manager/monthlyreport/:type
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
    month = e => {
        this.setState({
            month: e.target.value
        })
    }
    year = e => {
        this.setState({
            year: e.target.value
        })
    }
    monthlyreportchange = e => {
        this.setState({
            report: 'monthly'
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
                    <button onClick={this.monthlyreportchange}>Monthly Report</button>
                    <button onClick={this.reportchange}>Daily Report</button>
                    <button onClick={this.Transactionchange}>All Transactions</button>
                    {this.state.report == 'report' ? <input type="date" required onChange={this.content} name="report" /> : ''}
                    {this.state.report == 'monthly' ? <table>
                        <tr>
                            <th>Year: </th>
                            <th>Month: </th>
                        </tr>
                        <tr>
                            <td>
                                <input onChange={this.year} type="text" name="year" placeholder="Enter Year: " />
                            </td>
                            <td>
                                <select name="month" onChange={this.month}>
                                    <option value="01">Jan</option>
                                    <option value="02">Feb</option>
                                    <option value="03">Mar</option>
                                    <option value="04">Apr</option>
                                    <option value="05">May</option>
                                    <option value="06">Jun</option>
                                    <option value="07">Jul</option>
                                    <option value="08">Aug</option>
                                    <option value="09">Sep</option>
                                    <option value="10">Oct</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                            </td>
                        </tr>
                    </table> : ''}

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

