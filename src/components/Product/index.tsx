import { useCallback, useContext, useEffect, useState } from "react";
// import axiosInstance from "../../axiosInstance.js";
// import { AuthContext } from "../../context/authContext";
import axios from "axios";
type Props = {};

const Home = (props: Props) => {
  // const { user } = useContext(AuthContext);
  const [products, setproduct] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setproduct(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
       <div className="bg-green-200">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.image}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.category}
                    </a>
                  </h3>
                  <h1>{product.title}</h1>
                  <button className="bg-green-400 rounded-lg py-1 px-2">Add To Cart</button>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;