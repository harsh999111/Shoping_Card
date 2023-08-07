import { useCallback, useContext, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../axiosInstance.js";
import { AuthContext } from "../../context/authContext";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useProducts } from "../../context/productsContext.js";
import { CartTypeEnum, useCart } from "../../context/cartContext.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AddItemCartAction, deleteCartAction, updateCartAction } from "../../actions/cartAction.ts";

type Props = {};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = ({ routes }: Props) => {
  const { loadProducts, productsStatus } = useProducts();
  const { addToCart, updateCart, deleteCart, cartStatus } = useCart();
  const { productCategory } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, cart } = useSelector((state) => {
    return {
      products: state.products,
      cart: state.cart,
    };
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  const productsData = useSelector((state) => state.products);

  console.log("productsData", productsData);

  useEffect(() => {
    // let finalProducts = products;

    const price = searchParams.get("price");

    const finalProducts = products.filter((x) => {
      if (productCategory && price) {
        const priceArr = price.split(",");
        return (
          x.category === productCategory &&
          priceArr[0] < x.price &&
          priceArr[1] > x.price
        );
      }
      if (productCategory) {
        return x.category === productCategory;
      }
      if (price) {
        const priceArr = price.split(",");

        return priceArr[0] < x.price && priceArr[1] > x.price;
      }
      return true;
    });

    setFilteredProducts(finalProducts);
  }, [products, productCategory, searchParams]);

  console.log(productCategory);

  const loadCart = cartStatus.find((x) => x.type === CartTypeEnum.LOAD_CART);
  const loadProductsStatus = productsStatus.find(
    (x) => x.type === "LOAD_PRODUCTS"
  );

  if (loadCart || loadProductsStatus) {
    return (
      <div>
        {loadCart?.message && <p>{loadCart.message}</p>}
        {loadProductsStatus?.message && <p>{loadProductsStatus.message}</p>}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {filteredProducts.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        return (
          <div key={product.id} className="group relative">
            <Link to={`product/${product.id}`}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 line-clamp-1">
                    {product.title}
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>

                <p className="text-sm font-medium text-gray-900">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(product.price)}
                </p>
              </div>
              <div className="mt-2">
                <h4 className="sr-only">Reviews</h4>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating.rate > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">
                    {product.rating.rate} out of 5 stars
                  </p>
                  <a
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {product.rating.count} reviews
                  </a>
                </div>
              </div>
            </Link>
            {cartItem ? (
              <div className="flex items-center">
                <button
                  type="button"
                  className="mt-2 flex-1 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() =>
                    updateCartAction({ ...cartItem, quantity: cartItem.quantity + 1 })(dispatch)
                  }
                >
                  +
                </button>
                <p className="flex-1 text-center">{cartItem.quantity}</p>
                <button
                  type="button"
                  className="mt-2 flex-1 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    if (cartItem.quantity <= 1) {
                      deleteCartAction(cartItem)(dispatch)
                    } else {
                      updateCartAction({ ...cartItem, quantity: cartItem.quantity - 1 })(dispatch)
                    }
                  }}
                >
                  -
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={cartStatus.some(
                  (x) => x.type === CartTypeEnum.ADD_CART && x.id === product.id
                )}
                className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-wait"
                onClick={() =>
                  AddItemCartAction({ productId: product.id, quantity: 1 })(dispatch)
                }
              >
                Add to cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
