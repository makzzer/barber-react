import { Outlet,useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const LayoutPublic = () => {


  //esto es para cargar el Loading...
  const navegador = useNavigation()
  console.log(navegador.state)


  {
    /* uso el <Outlet/> para linkear con el contenido dinamico de las distintas
    paginas, esto es lo que está dentro de :children en el router/index.jsx */
  }
  return (
    <>
     <Navbar/>
      <main className="text-center container">
        {/*acá voy a agregar el loading para cuando esté cargando */}

        {
          (navegador.state==="loading") 
          ? <h1>Cargandooo</h1>
          :  <Outlet />
        }


        
      </main>
      <Footer/>
      </>
  );
};

export default LayoutPublic;
