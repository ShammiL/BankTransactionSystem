import React, { Component, useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter as Router, Route } from 'react-router-dom'
import Dashpage from './components/Dashpage'
import EmployeeRegister from './components/Register/EmployeeRegistration/EmployeeRegister'
import IndividualCustomerRegister from './components/Register/CustomerRegistration/IndividualCustomerRegister'
import Register from './components/Register'
import Home from './components/Home/Home'
import { fetchLoggedUser } from './actions/activeUserActions'
import Application from './router.js'

export default class App extends Component {

  // componentDidMount() {
  //   const token = localStorage.usertoken
  //   if (token) {
  //     fetchLoggedUser(token)
  //   }

  // }

  render() {
    console.log("REFRESH")
    
    return (
      <div className="App">
        <Provider store={store}>

          <Application   />

        </Provider>

      </div>
    );
  }
}






