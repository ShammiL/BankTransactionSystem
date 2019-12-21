import { FETCHED_LOGGED_USER, TYPE_USERNAME, TYPE_newPASSWORD, CHANGED_PASSWORD, TYPE_PASSWORD, FETCHED_ERROR_USER, TYPE_CONFIRM } from './types'

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

export const changepassword = (details) => dispatch => {
    axios.post('http://localhost:5000/changePassword', details).
        then(res => {
            console.log("RESPONSE", res);
            if (res.data.code == 200) {
                dispatch({
                    type: CHANGED_PASSWORD,
                    payload: res.data.user
                })
                window.location.assign("http://localhost:3000/simpledashpage");

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
export const typenewPassword = text => dispatch => {
    console.log(text)
    dispatch({
        type: TYPE_newPASSWORD,
        payload: text
    })
}
export const typeConfirm = text => dispatch => {
    dispatch({
        type: TYPE_CONFIRM,
        payload: text
    })
}
