import axiosInstance from "../axiosInstance.ts";

export const loardProductAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_PRODUCT_REQUEST" });
    const url = "660/products";
    const res = await axiosInstance.get(url);
    dispatch({ type: "LOAD_PRODUCT_Sucess", payload: res });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_PRODUCT_Fail", payload: error });
  }
};
