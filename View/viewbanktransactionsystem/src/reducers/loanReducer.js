import { TYPE_LOAN_DETAILS } from '../actions/types'


const initialState = {
    descripion: [''],
    loanOfficerID: [''],
    branchname: [''],
    customerID: [''],
    amount: [''],
    loanNum: [''],
    month: ['01'],
    year: [''],
    customerID:['']
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE_LOAN_DETAILS:
            return {
                ...state,
                [action.payload.key]: [action.payload.value],
            };

        default: return state;
    }
}


