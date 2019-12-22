import { FETCHED_LOAN, DETILS_ERROR } from '../actions/types'


const initialState = {
    descripion: [''],
    loanOfficerID: [''],
    branchname: [''],
    customerID: [''],
    amount: [''],
    loanNum: [''],
    month: [''],
    year: [''],
    customerID: ['']
}

export default function (state = initialState, action) {
    switch (action.type) {


        default: return state;
    }
}


