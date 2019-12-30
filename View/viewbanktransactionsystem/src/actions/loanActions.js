
import { TYPE_LOAN_DETAILS, FETCHED_REQUEST_ONLINE_LOAN, FETCHED_PAY_MONTHLY_INSTALLMENT, FETCHED_REQUEST_LOAN, FETCHED_ERROR_LOAN } from './types'

import axios from 'axios'


export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_LOAN_DETAILS,
        payload: { key, value }
    })
}
export const requestofflineloan = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/employee/requestOfflineLoan', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: FETCHED_REQUEST_LOAN,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: FETCHED_ERROR_LOAN,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))

}

export const paymonthlyinstallment = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/employee/payMonthlyInstallement', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: FETCHED_PAY_MONTHLY_INSTALLMENT,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: FETCHED_ERROR_LOAN,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))

}
export const requestonlineloan = (details) => dispatch => {
    console.log("DETAILS", details)
    axios.post('http://localhost:5000/customer/requestOnlineLoan', details).
        then(res => {
            console.log("RESPONSE", res.data);
            if (res.data.code == 200) {
                dispatch({
                    type: FETCHED_REQUEST_ONLINE_LOAN,
                    payload: res.data.result
                })
                window.location.assign("http://localhost:3000/simpledashpage");

            }
            else {
                console.log("CAME HERE")
                dispatch({
                    type: FETCHED_ERROR_LOAN,
                    payload: res.data.success
                })
            }

        }).catch(err => console.log(err))

}