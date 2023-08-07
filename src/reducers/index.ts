import { combineReducers } from "redux";
import cart from './cartReducer.ts'
import products from './productsReducer.ts'
import errors from './errorReducer.ts'
import loading from './loadingReducer.ts'

export default combineReducers({
    cart,
    products,
    errors,
    loading
})