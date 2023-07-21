import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/mainLayout";
import About from "./pages/About";
import AuthLayout from "./layouts/authLayout";
import "./index.css";
import { AuthProvider } from "./context/authContext";
import Product from "./pages/Product/index.js";
import { ProductsProvider } from "./context/productsContext.js";
import { CartProvider } from "./context/cartContext.tsx";
import { AppProvider } from "./context/appContext.tsx";

// Mounting

// -> Constructor(call only Once) (initialize of state base on props)
// -> getDerivedStateFromProps(static) (update state value base on props and state)
// -> render (render HTML)
// -> componentDidMount(call only Once)(API Call/event register/DOM manipulation)

// Updating
// -> getDerivedStateFromProps(static)
// -> shouldComponentUpdate (imrove Performace)
// -> render
// -> getSnapShotBeforeUpdate (calculate DOM)(not possible in function component)
// -> componentDidUpdate (DOM manipulation)

// UnMounting
// -> componentWillUnmount (cancel async calls)

// Error (not possible in function component)
// -> getDerivedStateFromError(static) (display error)
// -> componentDidCatch (log error)
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <ProductsProvider>
          <CartProvider>
            <MainLayout />
          </CartProvider>
        </ProductsProvider>
      </AppProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":productCategory",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
