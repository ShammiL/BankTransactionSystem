import { FETCHED_REGISTER_USER, TYPE_DETAILS } from './types'

import axios from 'axios'


export const fetchRegisteredUser = ({ details }) => dispatch => {
    // console.log(details)
    axios.post('http://localhost:5000/customer/register', { details }).
        then(res => {
            console.log("RESPONSE", res);
            // console.log("RESPONSE", res.data)
            dispatch({
                type: FETCHED_REGISTER_USER,
                payload: res.data
            })
        }).catch(err => console.log(err))

}
export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_DETAILS,
        payload: { key, value }
    })
}
