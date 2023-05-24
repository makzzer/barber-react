import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <h1>{error.statusText || error.data}</h1>;
      <Link className="btn btn-danger" to="/">Volver al home </Link>
    </>
  );
};

export default NotFound;
