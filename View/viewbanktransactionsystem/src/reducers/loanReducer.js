import { TYPE_LOAN_DETAILS, FETCHED_ERROR_LOAN, FETCHED_REQUEST_LOAN, FETCHED_PAY_MONTHLY_INSTALLMENT } from '../actions/types'


const initialState = {
    descripion: '',
    loanOfficerID: '',
    branchname: '',
    customerID: '',
    amount: '',
    loanNum: '',
    month: '01',
    year: '',
    customerID: '',
    error: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE_LOAN_DETAILS:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case FETCHED_ERROR_LOAN:
            return {
                ...state,
                error: action.payload,
            };
        case FETCHED_REQUEST_LOAN:
            return {
                ...state,
            };
        case FETCHED_PAY_MONTHLY_INSTALLMENT:
            return {
                ...state,
            };

        default: return state;
    }
}


