import { FETCHED_LOGGED_USER, FETCHED_ERROR_USER } from './types'
import jwt_decode from 'jwt-decode'

// import axios from 'axios'


export const fetchLoggedUser = (token) => dispatch => {
    const decoded = jwt_decode(token)
    dispatch({
        type: FETCHED_LOGGED_USER,
        payload: decoded
    })

    return null;
}
export const logout = (e) => dispatch => {
    e.preventDefault()
    console.log('object remove')
    localStorage.removeItem('usertoken')
    window.location.assign("http://localhost:3000");
    // this.props.history.push("/")
}



