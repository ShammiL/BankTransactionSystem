import { TYPE_DEPOSIT_DETAILS } from '../actions/types'


const initialState = {
    accountNum: [''],//username in text box
    amount: [''],// password in text box
    recieverAccountNum: [''],//response success
    date: [''],//status code
    time: [''] //type of user
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE_DEPOSIT_DETAILS:
            return {
                ...state,
                [action.payload.key]: [action.payload.value],
            };

        default: return state;
    }
}


