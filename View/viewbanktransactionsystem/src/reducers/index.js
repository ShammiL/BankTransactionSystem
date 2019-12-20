import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import activeUser from './activeReducer'
import transactionReducer from './transactionReducer'

export default combineReducers({
    registerReducer: registerReducer,
    loginUser: loginReducer,
    activeUser: activeUser,
    transactionReducer: transactionReducer
})