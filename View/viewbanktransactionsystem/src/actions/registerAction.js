import { FETCHED_REGISTER_USER, TYPE_DETAILS, FETCHED_ERROR_USER } from './types'

import axios from 'axios'


export const fetchRegisteredUser = ({ details }) => dispatch => {
    // console.log(details)
    axios.post('http://localhost:5000/customer/register', { details }).
        then(res => {
            if (res.data.code != 204) {
                dispatch({
                    type: FETCHED_REGISTER_USER,
                    payload: res.data
                })
                window.location.assign("http://localhost:3000");
            }
            else {
                dispatch({
                    type: FETCHED_ERROR_USER,
                    payload: res.data
                })
            }

        }).catch(err => console.log(err))

}
export const fetchEmployeeRegisteredUser = ({ details }) => dispatch => {
    // console.log(details)
    axios.post('http://localhost:5000/employee/register', { details }).
        then(res => {
            if (res.data.code != 204) {
                dispatch({
                    type: FETCHED_REGISTER_USER,
                    payload: res.data
                })
                window.location.assign("http://localhost:3000");
            }
            else {
                dispatch({
                    type: FETCHED_ERROR_USER,
                    payload: res.data
                })
            }

        }).catch(err => console.log(err))
    // window.location.assign("http://localhost:3000");

}
export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_DETAILS,
        payload: { key, value }
    })
}