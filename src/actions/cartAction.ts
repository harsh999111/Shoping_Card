import axiosInstance from "../axiosInstance.ts";

export const loardCartAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_Cart_REQUEST" });
    const url = "660/cart";
    const res = await axiosInstance.get(url);
    dispatch({ type: "LOAD_Cart_Sucess", payload: res });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOAD_Cart_Fail", payload: error });
  }
};
