import { useContext, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

type Props = {};

const MainLayout = (props: Props) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <header>Header....</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer...</footer>
    </>
  );
};

export default MainLayout;
