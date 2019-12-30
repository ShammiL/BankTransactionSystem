
import { TYPE_DEPOSIT_DETAILS, FETCHED_ONLINE_TRANSFER, FETCHED_DEPOSITE, FETCHED_ERROR_TRANSACTION, FETCHED_WITHDRAWAL } from './types'
import axios from 'axios'

export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_DEPOSIT_DETAILS,
        payload: { key, value }
    })
}


export const offlineDeposite = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/employee/offlineDeposite', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: FETCHED_DEPOSITE,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: FETCHED_ERROR_TRANSACTION,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))


}



export const offlineWithdrawal = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/employee/offlinewithdrawal', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: FETCHED_WITHDRAWAL,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: FETCHED_ERROR_TRANSACTION,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))


}

export const onlinetransfer = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/customer/onlineTransfer', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: FETCHED_ONLINE_TRANSFER,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: FETCHED_ERROR_TRANSACTION,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))


}