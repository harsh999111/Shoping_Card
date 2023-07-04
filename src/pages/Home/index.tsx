import { useCallback, useContext, useEffect } from "react";
import axiosInstance from "../../axiosInstance.js";
import { AuthContext } from "../../context/authContext";

type Props = {};

const Home = (props: Props) => {
  const { user } = useContext(AuthContext);

  const loadProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get("660/products");

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }, [user.accessToken]);

  useEffect(() => {
    loadProducts();
  }, []);

  return <div>Home Page</div>;
};

export default Home;
