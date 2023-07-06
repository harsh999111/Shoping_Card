import { useContext, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
// import Example from "../components/Product"
import Product from "../components/Product";

type Props = {};

const MainLayout = (props: Props) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      {/* <header>Header....</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer...</footer> */}
    <Product/>

    </>
  );
};

export default MainLayout;
