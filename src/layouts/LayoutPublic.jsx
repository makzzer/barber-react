import { Outlet,useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/LayoutPublic.css"

const LayoutPublic = () => {


  //esto es para cargar el Loading...
  const navegador = useNavigation()
  console.log(navegador.state)


  {
    /* uso el <Outlet/> para linkear con el contenido dinamico de las distintas
    paginas, esto es lo que está dentro de :children en el router/index.jsx */
  }

  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="text-center container">
        {navegador.state === "loading" ? (
          <h1>Cargandooo</h1>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPublic;