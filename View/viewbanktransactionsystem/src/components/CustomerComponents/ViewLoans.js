import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { typeDetails } from '../../actions/searchbarAction'
import SearchBar from './../otherComponents/SearchBar'

export class ViewCustomerLoan extends Component {

    // submit = e => {
    //     e.preventDefault();
    //     // console.log("Withdrawal Types", { username: this.props.accountNum, password: this.props.amount })
    //     // this.props.fetchLoggedUser(this.props.username, this.props.password)
    //     // localStorage.setItem('usertoken', res.data)
    // }
    // change = e => {
    //     this.props.typeDetails(e.target.name, e.target.value); //connect connect this prop

    // }


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchBar
                    type="customer/loan"
                />
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

export default connect(mapStatesToProps, mapActionToProps)(ViewCustomerLoan)

