import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ErrorMessage from "../components/Error/index.tsx";

type Props = {};

const AuthLayout = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const isRegister = !!location.pathname.match(/register/i);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {`Sign ${isRegister ? "up" : "in"} to your account`}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Outlet />

        {!isRegister && (
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        )}
      </div>

      <ErrorMessage />
    </div>
  );
};

export default AuthLayout;
