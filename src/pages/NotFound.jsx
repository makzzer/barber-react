import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return <h1>{error.data && error.statusText}</h1>;
};

export default NotFound;
