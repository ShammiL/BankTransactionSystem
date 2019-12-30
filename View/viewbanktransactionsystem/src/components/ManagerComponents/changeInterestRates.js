import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
/**
 * interest rate eka controller ekata ganiddi 0.01 n guna karala ganna one neda?
 * Meke duration kianne mokadda? FDType ekama nemeda?
 */

export class changeInterestRates extends Component {

    constructor(props) {
        super(props)
        this.state = {
            duration: "",
            FDType: "A",
            interest: "",
            error: ""
        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/manager/changeInterestRates', {
            "details": {
                "managerID": this.props.employeeID,
                "interest": this.state.interest,
                "duration": this.state.duration,
                "FDType": this.state.FDType
            }
        }).then((res) => {
            if (res.data.code == 200) {
                window.location.assign("http://localhost:3000/simpledashpage");
            }
            else {
                this.setState({
                    error: res.data.success
                })
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Change Interest Rate</h1>
                <form onSubmit={this.submit}>
                    <h5>Duration: </h5>
                    <input onChange={this.change} type="text" name="duration" placeholder="Duration" />

                    <h5>Deposit Period: </h5>
                    <select name="FDType" onChange={this.change}>
                        <option value="A">6 months</option>
                        <option value="B">1 year</option>
                        <option value="C">3 years</option>
                    </select>

                    <h5>Interest Rate: </h5>
                    <p><input onChange={this.change} type="text" name="interest" /> %</p>

                    <h1></h1>
                    <button type="submit">Save</button>
                </form>
                <p>{this.state.error}</p>
            </div>
        )
    }
}
const mapStatesToProps = state => ({
    employeeID: state.activeUser.employeeID,
})

export default connect(mapStatesToProps, {})(changeInterestRates)

