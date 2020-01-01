import { TYPE_NEW_ACCOUNT_DETAILS, ACCOUNT_CREATE_ERROR, ACCOUNT_CHECKING_CREATE, ACCOUNT_SAVING_CREATE, ACCOUNT_FD_CREATE } from '../actions/types'


const initialState = {
    accountID: '',
    amount: '',
    fdtype: 'A',
    branchID: '',
    customerID: '',
    accountType: 'Adult',
    guardianID: '',
    FDType: '',
    error: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE_NEW_ACCOUNT_DETAILS:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case ACCOUNT_CREATE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ACCOUNT_CHECKING_CREATE:
            return {
                ...state
            };
        case ACCOUNT_SAVING_CREATE:
            return {
                ...state
            };
        case ACCOUNT_FD_CREATE:
            return {
                ...state
            };

        default: return state;
    }
}


