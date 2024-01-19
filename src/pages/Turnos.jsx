import ListaTurnos from "../components/ListaTurnos";
import { NavLink } from "react-router-dom";

const Turnos = () => {
  return (
    <div className="container text-center mt-4 mb-4">
      <h1 className="mb-12">MIS TURNOS</h1>
      <ListaTurnos />

      <div className="footer row d-flex mx-4 align-items-end mx-auto uppercase">
        
          <NavLink className="btn btn-dark mt-2 p-4 pb-10" to="/">
            VOLVER
          </NavLink>
        
      </div>
    </div>
  );
};

export default Turnos;
