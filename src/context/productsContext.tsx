import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance.js";
import useAPIStatus from "../hooks/useAPIStatus.tsx";

type ProductsContextType = {};

export const ProductsContext = createContext<ProductsContextType>();

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState([]);
  const {
    status:  productsStatus,
    changeLoadingState,
    changeSuccessState,
    changeErrorState,
  } = useAPIStatus();

  const loadProducts = useCallback(async () => {
    const type = "LOAD_PRODUCTS";
    try {
      changeLoadingState({
        type,
        message: "Products is loading...",
      });
      const url = "660/products";
      const res = await axiosInstance.get(url);
      setProducts(res);
      changeSuccessState({ type });
    } catch (error) {
      changeErrorState({ type, message: "Products Load Failed..." });
    }
  }, []);

  const value = useMemo(
    () => ({ products, productsStatus, loadProducts }),
    [products, loadProducts, productsStatus]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
