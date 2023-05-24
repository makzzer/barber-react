import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

{
  /*este es el router que importo */
}

{
  /*errorElement le linkeo la pagina de NotFound*/
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },

  {
    path: "/blog",
    element: <Blog />,
    errorElement: <NotFound />,
  },

  {
    path: "/about",
    element: <About />,
    errorElement: <NotFound />,
  },
]);
