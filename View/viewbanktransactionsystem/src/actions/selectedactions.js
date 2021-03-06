
import { TYPE_NEW_ACCOUNT_DETAILS, ACCOUNT_CREATE_ERROR, ACCOUNT_CHECKING_CREATE, ACCOUNT_SAVING_CREATE, ACCOUNT_FD_CREATE } from './types'

import axios from 'axios'


export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_NEW_ACCOUNT_DETAILS,
        payload: { key, value }
    })
}



export const getloan = (customerID) => dispatch => {
    console.log("DETAILS", details)
    axios.get('http://localhost:5000/loan/getByCustomerId/' + customerID).
        then(res => {
            console.log("RESPONSE", res.data);
            if (customerID != 'all') {
                dispatch({
                    type: FETCHED_LOAN,
                    payload: res.data
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
        }).catch(err => console.log(err))

}


export const getAccount = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/employee/create/saving', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: ACCOUNT_CHECKING_CREATE,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: ACCOUNT_CREATE_ERROR,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))

}

export const getreport = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/employee/createFD', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: ACCOUNT_CHECKING_CREATE,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: ACCOUNT_CREATE_ERROR,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))

}