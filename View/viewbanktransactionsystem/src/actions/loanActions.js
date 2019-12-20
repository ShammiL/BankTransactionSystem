
import { TYPE_LOAN_DETAILS } from './types'

// import axios from 'axios'


export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_LOAN_DETAILS,
        payload: { key, value }
    })
}