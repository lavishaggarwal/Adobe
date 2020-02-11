import {FILTER_BY_PRICE} from "../actions";

export const filterByPriceReducer = (state = '', action) => {
    switch (action.type) {
        case FILTER_BY_PRICE:
            return action.payload.value;
        default:
            return state;
    }
}