import { combineReducers } from 'redux'
import employeeReducer from './employeeReducer'
import customerReducer from './customerReducer'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'

export default combineReducers({
    registerReducer: registerReducer,
    loginUser: loginReducer
})