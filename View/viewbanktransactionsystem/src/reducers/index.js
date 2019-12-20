import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import activeUser from './activeReducer'
import transactionReducer from './transactionReducer'
import newAccountReducer from './newAccountReducer'
import loanReducer from './loanReducer'



export default combineReducers({
    registerReducer: registerReducer,
    loginUser: loginReducer,
    activeUser: activeUser,
    transactionReducer: transactionReducer,
    newAccountReducer: newAccountReducer,
    loanReducer: loanReducer
})