import { Outlet } from "react-router-dom";

type Props = {};

const MainLayout = (props: Props) => {
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
