export const filterByPrice = (arr, priceFilter) => {
    if (priceFilter != "") {
        if (arr !== undefined && arr.length > 0) {
            return arr.filter(item => item.price > priceFilter.min && item.price < priceFilter.max);
        }
    }
    else {
        return arr;
    }
};