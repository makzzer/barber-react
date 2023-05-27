import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import LayoutPublic from "../layouts/LayoutPublic";
import { children } from "react";

{
  /*este es el router que importo */
}

{
  /*errorElement le linkeo la pagina de NotFound*/
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
        path: "/blog",
        element: <Blog />,
      },

      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
