import { FETCHED_ERROR_USER, TYPE_newPASSWORD, TYPE_USERNAME, CHANGED_PASSWORD, TYPE_PASSWORD, TYPE_CONFIRM } from '../actions/types'


const initialState = {
    username: '',//username in text box
    password: '',// password in text box
    result: '',//response success
    code: '',//status code
    type: '', //type of user
    confirm: '',
    newpassword: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHED_ERROR_USER:
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
        case TYPE_newPASSWORD:
            return {
                ...state,
                newpassword: action.payload,
            };
        case TYPE_CONFIRM:
            return {
                ...state,
                confirm: action.payload,
            };
        case CHANGED_PASSWORD:
            return {
                ...state,
            };

        default: return state;
    }
}


