import { createBrowserRouter } from "react-router-dom";
import Turnos from "../pages/Turnos";
import Home from "../pages/Home";
import Ingresar from "../pages/Ingresar";
import NotFound from "../pages/NotFound";
import LayoutPublic from "../layouts/LayoutPublic";


{
  /*este es el router que importo */
}

{
  /*errorElement le linkeo la pagina de NotFound*/
}
{
  /*Dentro de element: llamo siempre al layout publico para que lo que varie sea
el contenido de las paginas blog, about y home

el index: true, es para indicar que "/" es la ruta que corresponde a HOME*/
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/turnos",
        element: <Turnos />,
      },

      {
        path: "/ingresar",
        element: <Ingresar />,
      },
    ],
  },
]);
