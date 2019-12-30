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
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return (
            <div>
                <p style = {{align:"right"}}>{date}</p>
                <h1>
                    Welcome {this.props.user.firstName} {this.props.user.lastName} !
                </h1>
            </div >
        )
    }
}

const mapStatesToProps = state => ({
    user: state.activeUser
})


export default connect(mapStatesToProps, {})(Profile)

