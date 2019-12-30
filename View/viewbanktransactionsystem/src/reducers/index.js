import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import activeUser from './activeReducer'
import transactionReducer from './transactionReducer'
import newAccountReducer from './newAccountReducer'
import loanReducer from './loanReducer'
import searchbar from './searchBarReducer'
import loan from './selectedLoanReducer'




export default combineReducers({
    registerReducer: registerReducer,
    loginUser: loginReducer,
    activeUser: activeUser,
    transactionReducer: transactionReducer,
    newAccountReducer: newAccountReducer,
    loanReducer: loanReducer,
    searchbar: searchbar,
    loan: loan
})