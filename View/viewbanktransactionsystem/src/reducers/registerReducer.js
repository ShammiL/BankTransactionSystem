import { FETCHED_REGISTER_USER, TYPE_DETAILS, FETCHED_ERROR_USER } from '../actions/types'


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
    companyName: [''],
    salary: [''],
    designation: ['manager'],
    branchID: [''],
    existError: ''
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
        case FETCHED_ERROR_USER:
            return {
                ...state,
                existError: action.payload.success,
                code: action.payload.code
            };


        default: return state;
    }
}


