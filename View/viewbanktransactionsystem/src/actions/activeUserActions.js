import { FETCHED_LOGGED_USER, FETCHED_ERROR_USER } from './types'
import jwt_decode from 'jwt-decode'

// import axios from 'axios'


export const fetchLoggedUser = (token) => dispatch => {
    console.log("OKKKKK")
    const decoded = jwt_decode(token)
    console.log("DECCODED DTA", decoded)
    dispatch({
        type: FETCHED_LOGGED_USER,
        payload: decoded
    })

    return null;
}

