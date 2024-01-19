
import ListaTurnos from "../components/ListaTurnos"
import { NavLink } from "react-router-dom";

const Turnos = () => {
  return (
    <div className="container text-center mt-4 mb-4">
      <h1 className="mb-12">MIS TURNOS</h1>
      <ListaTurnos />

      <div className="row d-flex gap-2 custom-container-boton mt-2">
          <div className="d-flex flex-column m-2 uppercase">


            <NavLink className="btn btn-dark  m-2 p-4 pb-10" to="/">
              VOLVER
            </NavLink>
          </div>
        </div>
      
      
    </div>
  );
};

export default Turnos;
