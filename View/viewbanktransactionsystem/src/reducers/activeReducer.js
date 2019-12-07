import { FETCHED_LOGGED_USER, TYPE_USERNAME, TYPE_PASSWORD } from '../actions/types'


const initialState = {
    employeeID: '',
    customerID: '',
    firstName: '',//username in text box
    lastName: '',// password in text box
    email: '',//response success
    username: '',//status code
    nic: '',
    phoneNumber: '',
    buildingNumber: '',
    streetName: '',
    city: '',
    error: '',
    type: '',
    companyName: '',
    salary: '',
    designation: '',
    branchID: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHED_LOGGED_USER:
            return {
                ...state,
                employeeID: action.payload.employeeID,
                firstName: action.payload.firstName,
                customerID: action.payload.customerID,
                lastName: action.payload.lastName,
                email: action.payload.email,
                username: action.payload.username,
                nic: action.payload.nic,
                phoneNumber: action.payload.phoneNumber,
                buildingNumber: action.payload.buildingNumber,
                streetName: action.payload.streetName,
                city: action.payload.city,
                error: action.payload.error,
                type: action.payload.type,
                companyName: action.payload.companyName,
                salary: action.payload.salary,
                designation: action.payload.designation,
                branchID: action.payload.branchID
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


