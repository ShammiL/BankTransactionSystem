import React, { Component } from 'react'
import Home from './Home'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'

class Dashpage extends Component {
    render() {
        return (
            <div>
                <div className='container'>
                    {this.props.code == 200 ? <Home /> : <LoginForm />}
                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => ({

    code: state.loginUser.code
})
const mapActionToProps = state => ({

})
export default connect(mapStatesToProps, mapActionToProps)(Dashpage)