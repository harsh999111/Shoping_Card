import axiosInstance from "../axiosInstance.ts";

export const loadCartAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_CART_REQUEST" });
    const url = "660/cart";
    const res = await axiosInstance.get(url);
    dispatch({ type: "LOAD_CART_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "LOAD_CART_FAIL", payload: error });
  }
};

export const AddItemCartAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_ITEM_CART_REQUEST" });
    const url = "660/cart";
    const res = await axiosInstance.post(url, data);
    dispatch({ type: "ADD_ITEM_CART_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "ADD_ITEM_CART_FAIL", payload: error });
  }
};

export const updateCartAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ITEM_CART_REQUEST" });
    const url = `660/cart/${data.id}`;
    const res = await axiosInstance.put(url, data);
    dispatch({ type: "UPDATE_ITEM_CART_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "UPDATE_ITEM_CART_FAIL", payload: error });
  }
};

export const deleteCartAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ITEM_CART_REQUEST" });
    const url = `660/cart/${data.id}`;
    await axiosInstance.delete(url);
    dispatch({ type: "DELETE_ITEM_CART_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_ITEM_CART_FAIL", payload: error });
  }
};
