import { FETCHED_LOGGED_USER, TYPE_USERNAME, TYPE_PASSWORD, FETCHED_ERROR_USER } from './types'

import axios from 'axios'


export const fetchLoggedUser = (username, password) => dispatch => {
    axios.post('http://localhost:5000/login', { username: username, password: password }).
        then(res => {
            console.log("RESPONSE", res);
            if (res.data.code == 200) {
                localStorage.setItem('usertoken', res.data.token)
                dispatch({
                    type: FETCHED_LOGGED_USER,
                    payload: res.data.user
                })
            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: FETCHED_ERROR_USER,
                    payload: res.data
                })
            }

        }).catch(err => console.log(err))


}
export const typeUsername = text => dispatch => {
    dispatch({
        type: TYPE_USERNAME,
        payload: text
    })
}
export const typePassword = text => dispatch => {
    dispatch({
        type: TYPE_PASSWORD,
        payload: text
    })
}