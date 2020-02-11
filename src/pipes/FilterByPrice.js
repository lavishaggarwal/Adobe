import { FILTER_BY_PRICE } from "../actions";

export const filterByPrice = (arr, priceFilter) => {
    if (arr != undefined && arr.length > 0) {
        return arr.filter(item => item.price > priceFilter.min && item.price < priceFilter.max);
    }
};