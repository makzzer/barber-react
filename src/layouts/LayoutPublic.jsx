import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  {
    /* uso el <Outlet/> para linkear con el contenido dinamico de las distintas
    paginas, esto es lo que está dentro de :children en el router/index.jsx */
  }
  return (
    <>
      <div className="nav navbar bg-warning p-4"></div>
      <Outlet />
      <footer className="bg-dark p-4"></footer>
    </>
  );
};

export default LayoutPublic;
