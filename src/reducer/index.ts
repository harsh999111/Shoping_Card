import { combineReducers } from "redux";
import cart from "./cartReducer.ts";
import product from "./productReducer.ts";
export default combineReducers({
    cart,
    product
})