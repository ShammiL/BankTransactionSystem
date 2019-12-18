import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import AppbarDrawer from './AppbarDrawer'


export default class Home extends Component {

    logout(e) {
        e.preventDefault()
        console.log('object remove')
        localStorage.removeItem('usertoken')
        window.location.assign("http://localhost:3000");
        // this.props.history.push("/")
    }
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded)
    }


    render() {
        return (
            <div>
                <AppbarDrawer
                    logout={this.logout}
                    
                />
            </div >
        )
    }
}
