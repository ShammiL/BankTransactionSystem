


import { TYPE_SEARCH_BAR } from './types'

// import axios from 'axios'

export const typeDetails = (key, value) => dispatch => {
    dispatch({
        type: TYPE_SEARCH_BAR,
        payload: { key, value }
    })
}