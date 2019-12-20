
import { TYPE_NEW_ACCOUNT_DETAILS } from './types'

// import axios from 'axios'


export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_NEW_ACCOUNT_DETAILS,
        payload: { key, value }
    })
}