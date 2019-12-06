import { FETCHED_REGISTER_USER, TYPE_DETAILS } from '../actions/types'


const initialState = {
    firstName: [''],//username in text box
    lastName: [''],// password in text box
    email: [''],//response success
    username: [''],//status code
    nic: [''], //type of user
    password: [''],
    phoneNumber: [''],
    buildingNumber: [''],
    streetName: [''],
    city: [''],
    error: [''],
    type: ['individual'],
    companyName: ['']
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHED_REGISTER_USER:
            return {
                ...state
            };
        case TYPE_DETAILS:
            return {
                ...state,
                [action.payload.key]: [action.payload.value],
            };


        default: return state;
    }
}


