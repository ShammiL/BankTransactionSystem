import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter as Router, Route } from 'react-router-dom'
import Dashpage from './components/Dashpage'
import EmployeeRegister from './components/EmployeeRegister'
import CustomerRegister from './components/CustomerRegister'
import Register from './components/Register'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Dashpage} />
          <Route exact path="/customer/register" component={CustomerRegister} />
          <Route exact path="/employee/register" component={EmployeeRegister} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
        </Router>
      </Provider>

    </div>
  );
}

export default App;





