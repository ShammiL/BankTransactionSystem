import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { typeDetails } from '../../actions/searchbarAction'
import SearchBar from './../otherComponents/SearchBar'
import Loan from '../detailscomponents/Loan'
export class ViewLoan extends Component {



    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchBar
                    type="viewAllLoan"
                />
                <Loan
                />
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    content: state.searchbar.content
})
const mapActionToProps = {
    // typeDetails: typeDetails,
}

export default connect(mapStatesToProps, mapActionToProps)(ViewLoan)

