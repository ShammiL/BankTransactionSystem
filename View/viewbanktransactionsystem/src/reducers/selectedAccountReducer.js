import { TYPE_NEW_ACCOUNT_DETAILS } from '../actions/types'


const initialState = {
    accountID: [''],
    amount: [''],
    fdtype: [''],
    branch: [''],
    customerID: [''],
    accountType: [''],
    guardianID: [''],
    FDType: ['']
}

export default function (state = initialState, action) {
    switch (action.type) {

        default: return state;
    }
}


