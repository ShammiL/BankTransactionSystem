import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SingleTransaction from '../detailscomponents/SingleTransaction'

export class ViewTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "search": 'deposit',
            transactions: []
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

    render() {
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

