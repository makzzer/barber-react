import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <>
      <div className="nav navbar bg-warning p-4"></div>
      <Outlet/>
      <footer className="bg-dark p-4"></footer>
    </>
  );
};

export default LayoutPublic;
