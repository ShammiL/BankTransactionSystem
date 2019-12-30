import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { typeDetails } from '../../actions/searchbarAction'
// import SearchBar from './../otherComponents/SearchBar'
import Account from '../detailscomponents/Account'
export class ViewAccount extends Component {



    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Account
                />
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    // content: state.searchbar.content
})
// const mapStatesToProps = {}
const mapActionToProps = {
    // typeDetails: typeDetails,
}

export default connect(mapStatesToProps, mapActionToProps)(ViewAccount)

