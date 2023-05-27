import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

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
      <Footer/>
      </>
  );
};

export default LayoutPublic;
