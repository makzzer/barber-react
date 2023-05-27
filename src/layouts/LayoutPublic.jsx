import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"

const LayoutPublic = () => {
  {
    /* uso el <Outlet/> para linkear con el contenido dinamico de las distintas
    paginas, esto es lo que está dentro de :children en el router/index.jsx */
  }
  return (
    <>
     <Navbar/>
      <main className="text-center container">
        <Outlet />
      </main>
      <footer className="bg-dark p-4 container text-center ">Footer</footer>
    </>
  );
};

export default LayoutPublic;
