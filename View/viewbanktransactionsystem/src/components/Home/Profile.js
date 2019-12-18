import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'

export class Profile extends Component {

    constructor() {
        super()
        this.state = {
            details: {}
        }
    }

    // componentDidMount() {
    //     const token = localStorage.usertoken
    //     const decoded = jwt_decode(token)
    //     this.setState({ details: decoded })
    //     // console.log(decoded)
    // }

    render() {
        return (
            <div>
                <div>
                    firstName :{this.props.user.firstName}
                </div>
                <div>
                    lastName :{this.props.user.lastName}
                </div>
                <div>
                    Username :{this.props.user.username}
                </div>
            </div >
        )
    }
}

const mapStatesToProps = state => ({
    user: state.activeUser
})


export default connect(mapStatesToProps, {})(Profile)

