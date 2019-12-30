import { TYPE_SEARCH_BAR } from '../actions/types'


const initialState = {
    content:''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE_SEARCH_BAR:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };

        default: return state;
    }
}
