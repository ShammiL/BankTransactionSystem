import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

export default class Profile extends Component {

    constructor() {
        super()
        this.state = {
            details: {}
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({ details: decoded })
        // console.log(decoded)
    }

    render() {
        return (
            <div>
                <div>
                    firstName :{this.state.details.firstName}
                </div>
                <div>
                    lastName :{this.state.details.lastName}
                </div>
                <div>
                    Username :{this.state.details.username}

                </div>
            </div >
        )
    }
}
