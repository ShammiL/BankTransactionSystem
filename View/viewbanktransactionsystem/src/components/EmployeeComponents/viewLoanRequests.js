import React, { Component } from 'react'
import { connect } from 'react-redux'
import Request from '../detailscomponents/Request'
export class ViewLoanRequest extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Request
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

export default connect(mapStatesToProps, mapActionToProps)(ViewLoanRequest)

