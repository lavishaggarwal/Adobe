import {combineReducers} from 'redux';
import shop from './shop.reducer';
import {filterByPriceReducer} from "./filterByPrice.filter.reducer";

export default combineReducers({
    shop,
    orderBy: filterByPriceReducer,
});
