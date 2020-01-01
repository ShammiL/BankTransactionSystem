import React, { Component } from 'react'
import axios from 'axios'
import Divider from '@material-ui/core/Divider';

export default class singleLoan extends Component {
    constructor(props) {
        super(props);
        this.state = { "error": "" }
    }

    close = (e) => {
        const confirm = window.confirm("Do you really want to close this account?")

        if (confirm)
            axios.put("http://localhost:5000/accountClose", { "id": this.props.accountNum }).then((res) => {

                if (res.data.code == 200) {
                    console.log("NO ERROR")
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
                <p>Account Number: {this.props.accountNum}</p>
                <p>Customer: {this.props.username}</p>
                <p>Customer ID: {this.props.customerID}</p>
                <p>Account Balance (LKR): {this.props.balance}</p>
                <p>Branch: {this.props.branch}</p>
                <button onClick={e => this.close(e)}>Close This Account</button>
                <p> {this.state.error} </p>
                <Divider />
            </div >
        )
    }
}
