import React, { Component } from 'react'

export default class SingleTransaction extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>Receipt Number: {this.props.receiptNum}</p>
                <p>Amount: {this.props.amount}</p>
                <p>Account Number: {this.props.accountNum}</p>
                <p>Date: {this.props.date}</p>
                <div>
                    {this.props.receivingAccountID != undefined ? <p> Recieving Account : {this.props.receivingAccountID} </p> : ''}
                </div>
            </div>
        )
    }
}
