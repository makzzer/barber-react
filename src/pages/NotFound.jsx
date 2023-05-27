import { useRouteError, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <div className="navbar bg-warning py-4 container"></div>

      <main className="container d-flex flex-column">
        <h1 className="text-center">{error.statusText || error.data}</h1>
        <div className="mx-auto p-2">
          <Link className="btn btn-dark" to="/">Volver al home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
