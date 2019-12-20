import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails } from '../../actions/newAccountReducer'

export class payMonthlyInstallment extends Component {

    submit = e => {
        e.preventDefault();
    }
    change = e => {
        this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop
    }



    render() {
        return (
            <div>
                <h1>Monthly Installment Payment</h1>
                <form onSubmit={this.submit}>
                    <h5>Loan plan Identification Number: </h5>
                    <input onChange={this.change} type="text" name="loanNum" placeholder="Loan ID" />
                    <table>
                        <tr>
                            <th>Year: </th>
                            <th>Month: </th>
                        </tr>
                        <tr>
                            <td>
                                <input onChange={this.change} type="text" name="year" placeholder="Enter Year: " />
                            </td>
                            <td>
                                <select name="month" onChange={this.change}>
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
                    </table>

                    <h1></h1>
                    <button type="submit">Make Payment</button>
                </form>
            </div>
        )
    }
}
const mapStatesToProps = state => ({
    branchID: state.loanReducer.loanNum,
    customerID: state.loanReducer.year,
    accountType: state.loanReducer.month

})
const mapActionToProps = {
    typeDetails: typeDetails,
    // typePassword: typePassword,
    // fetchLoggedUser: fetchLoggedUser
}

export default connect(mapStatesToProps, mapActionToProps)(payMonthlyInstallment)
