import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'
import activeUser from './activeReducer'

export default combineReducers({
    registerReducer: registerReducer,
    loginUser: loginReducer,
    activeUser: activeUser
})