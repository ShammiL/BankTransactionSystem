import { combineReducers } from 'redux'
import employeeReducer from './employeeReducer'
import customerReducer from './customerReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    employee: employeeReducer,
    customer: customerReducer,
    loginUser: loginReducer
})