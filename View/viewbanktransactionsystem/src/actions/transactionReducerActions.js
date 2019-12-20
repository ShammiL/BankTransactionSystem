
import { TYPE_DEPOSIT_DETAILS } from './types'

// import axios from 'axios'


export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_DEPOSIT_DETAILS,
        payload: { key, value }
    })
}