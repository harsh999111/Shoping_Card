import axiosInstance from "../axiosInstance.ts";

export const loadProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_PRODUCTS_REQUEST" });
    const url = "660/products";
    const res = await axiosInstance.get(url);
    dispatch({ type: "LOAD_PRODUCTS_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "LOAD_PRODUCTS_FAIL", payload: error });
  }
};
