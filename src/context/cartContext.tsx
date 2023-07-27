import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axiosInstance from "../axiosInstance.js";
import { useAuth } from "./authContext.tsx";

type CartContextType = {
  cart: CartItemType[];
  loadCart: () => Promise<void>;
  addToCart: (data: CartItemType) => Promise<void>;
  updateCart: (data: CartItemType) => Promise<void>;
  deleteCart: (data: CartItemType) => Promise<void>;
  cartStatus: StatusType[];
};

export enum StatusEnum {
  loading = "loading",
  error = "error",
}

export enum CartTypeEnum {
  LOAD_CART = "LOAD_CART",
  ADD_CART = "ADD_CART",
  UPDATE_CART = "UPDATE_CART",
  DELETE_CART = "DELETE_CART",
}

type StatusType = {
  state: StatusEnum;
  message: string;
  type: CartTypeEnum;
  id?: number;
};

type CartItemType = {
  productId: number;
  quantity: number;
  userId: number;
  id: number;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  cartStatus: [],
  // loadCart: () => {},
  // deleteCart: (data: CartItemType) => Promise<void>,
  // updateCart: (data: CartItemType) => Promise<void>,
  // addToCart: (data: CartItemType) => Promise<void>,
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const { user } = useAuth();
  const [cartStatus, setCartStatus] = useState<StatusType[]>([]);

  const changeLoadingState = ({
    type,
    message,
    id,
  }: Omit<StatusType, "state">) => {
    setCartStatus((val) => {
      return [...val, { state: StatusEnum.loading, type, message, id }];
    });
  };

  const changeSuccessState = ({
    type,
    id,
  }: Omit<StatusType, "state" | "message">) => {
    setCartStatus((val) =>
      val.filter((x) => !(x.type === type && x.id === id))
    );
  };

  const changeErrorState = ({
    type,
    id,
    message,
  }: Omit<StatusType, "state">) => {
    setCartStatus((val) =>
      val.map((x) =>
        x.type === type && x.id === id
          ? {
              ...x,
              state: StatusEnum.error,
              message: message,
            }
          : x
      )
    );
  };

  const loadCart = useCallback(async () => {
    const type = CartTypeEnum.LOAD_CART;
    try {
      changeLoadingState({
        type,
        message: "Cart is loading...",
      });

      const url = "660/cart";
      const res: CartItemType[] = await axiosInstance.get(url);
      setCart(res);

      changeSuccessState({ type });
    } catch (error) {
      changeErrorState({ type, message: "Cart Load Failed..." });
    }
  }, []);

  const addToCart = useCallback(
    async (data: CartItemType) => {
      const type = CartTypeEnum.ADD_CART;
      const id = data.productId;
      try {
        changeLoadingState({
          type,
          message: "Adding item to cart...",
          id,
        });
        setCartStatus((val) => {
          return [
            ...val,
            {
              state: StatusEnum.loading,
              type: CartTypeEnum.ADD_CART,
              message: "Cart is loading...",
              id: data.productId,
            },
          ];
        });
        const userId = user?.user?.id;
        const url = "660/cart";
        const res: CartItemType = await axiosInstance.post(url, {
          ...data,
          userId,
        });
        setCart((val) => [...val, res]);

        changeSuccessState({ type, id });
        //   setCart(res);
      } catch (error) {
        changeErrorState({ type, id, message: "Add cart item failed..." });
      }
    },
    [user?.user?.id]
  );

  const updateCart = useCallback(async (data: CartItemType) => {
    const type = CartTypeEnum.UPDATE_CART;
    const id = data.productId;
    try {
      changeLoadingState({
        type,
        message: "updating item to cart...",
        id,
      });
      const url = `660/cart/${data.id}`;
      const res: CartItemType = await axiosInstance.put(url, data);

      setCart((val) => {
        const index = val.findIndex((x) => x.id === res.id);
        return [...val.slice(0, index), res, ...val.slice(index + 1)];
      });

      changeSuccessState({ type, id });
      //   setCart(res);
    } catch (error) {
      changeErrorState({ type, id, message: "update cart item failed..." });
    }
  }, []);

  const deleteCart = useCallback(async (data: CartItemType) => {
    const type = CartTypeEnum.DELETE_CART;
    const id = data.productId;
    try {
      changeLoadingState({
        type,
        message: "deleting item from cart...",
        id,
      });
      const url = `660/cart/${data.id}`;
      await axiosInstance.delete(url);
      setCart((val) => {
        const index = val.findIndex((x) => x.id === data.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
      changeSuccessState({ type, id });
    } catch (error) {
      changeErrorState({ type, id, message: "delete cart item failed..." });
    }
  }, []);

  const value = useMemo(
    () => ({ cart, loadCart, addToCart, updateCart, deleteCart, cartStatus }),
    [cart, loadCart, addToCart, updateCart, deleteCart, cartStatus]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
