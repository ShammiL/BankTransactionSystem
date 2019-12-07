import React, { Component } from 'react'
import Home from './Home'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'

class Dashpage extends Component {
    render() {
        return (
            <div>
                <div className='container'>
                    {localStorage.usertoken ? <Home /> : <LoginForm />}
                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => ({

    logged: state.activeUser.type
})
const mapActionToProps = state => ({

})
export default connect(mapStatesToProps, mapActionToProps)(Dashpage)