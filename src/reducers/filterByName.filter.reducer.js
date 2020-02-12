import {FILTER_BY_NAME} from "../actions";

export const filterByNameReducer = (state = '', action) => {
    switch (action.type) {
        case FILTER_BY_NAME:
            return action.payload;
        default:
            return state;
    }
}