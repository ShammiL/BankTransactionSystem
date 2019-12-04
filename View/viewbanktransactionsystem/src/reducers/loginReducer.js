import { FETCHED_LOGGED_USER, TYPE_USERNAME, TYPE_PASSWORD } from '../actions/types'


const initialState = {
    username: '',//username in text box
    password: '',// password in text box
    result: '',//response success
    code: '',//status code
    type: '', //type of user
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHED_LOGGED_USER:
            return {
                ...state,
                result: action.payload.success,
                code: action.payload.code
            };
        case TYPE_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        case TYPE_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };

        default: return state;
    }
}


