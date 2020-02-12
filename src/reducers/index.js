import {combineReducers} from 'redux';
import shop from './shop.reducer';
import {filterByPriceReducer} from "./filterByPrice.filter.reducer";
import {filterByNameReducer} from "./filterByName.filter.reducer";

export default combineReducers({
    shop,
    orderBy: filterByPriceReducer,
    nameFilter: filterByNameReducer
});
