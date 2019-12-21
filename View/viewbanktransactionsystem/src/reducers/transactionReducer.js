import { TYPE_DEPOSIT_DETAILS, FETCHED_DEPOSITE, FETCHED_ONLINE_TRANSFER, FETCHED_ERROR_TRANSACTION, FETCHED_WITHDRAWAL } from '../actions/types'


const initialState = {
    accountNum: '',//username in text box
    amount: '',// password in text box
    recieverAccountNum: '',//response success
    date: '',//status code
    time: '',
    customerID: '', //type of user
    error: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE_DEPOSIT_DETAILS:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case FETCHED_WITHDRAWAL:
            return {
                ...state,
                //[action.payload.key]: action.payload.value,
            };

        case FETCHED_DEPOSITE:
            return {
                ...state,
                //[action.payload.key]: action.payload.value,
            };

        case FETCHED_ONLINE_TRANSFER:
            return {
                ...state,
                //[action.payload.key]: action.payload.value,
            };

        case FETCHED_ERROR_TRANSACTION:
            return {
                ...state,
                error: action.payload,
            };

        default: return state;
    }
}


