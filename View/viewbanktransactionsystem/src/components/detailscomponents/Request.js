import React, { Component } from 'react'
import axios from 'axios'
import SingleRequest from './singleRequest'
import { connect } from 'react-redux'

export class Request extends Component {

    constructor(props) {
        super(props);
        this.state = { loanRequests: [] }
    }


    componentDidMount() {
        if (this.props.type == "manager")
            axios.get("http://localhost:5000/manager/viewRequest").then((res) => {
                this.setState({ loanRequests: res.data.result })
            })
    }


    render() {
        const items = this.state.loanRequests.map((item, key) =>
            item.approved == 0 ?
                <SingleRequest
                    key={key}
                    requestID={item.requestID}
                    description={item.description}
                    amount={item.amount}
                    date={item.date_}
                    loanOfficerID={item.loanOfficerID}
                    branchID={item.branchID}
                    customerID={item.customerID}
                    employeeID={this.props.employeeID}
                />
                : ''


        );
        return (
            <div>
                {items}
            </div>
        )
    }
}


const mapStatesToProps = state => ({
    type: state.activeUser.type,
    employeeID: state.activeUser.employeeID
})

export default connect(mapStatesToProps, {})(Request)

