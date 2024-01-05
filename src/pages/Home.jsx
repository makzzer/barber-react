import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
    <div className="container text-center mt-4 mb-4">
    <h1 className="mb-8">LA BARBER</h1>

    </div>
    
      <div className="container text-center text-uppercase">
        <div className="row d-flex gap-2 bg-body-tertiary">
          <div className="d-flex flex-column m-2">
            <NavLink className="btn btn-outline-dark m-2 p-4 pb-10" to="#">
              Reservar Turno
            </NavLink>

            <NavLink className="btn btn-outline-dark m-2 p-4" to="#">
              Modificar Turno
            </NavLink>

            <NavLink className="btn btn-outline-dark m-2 p-4" to="#">
              Cancelar Turno
            </NavLink>

            <NavLink className="btn btn-outline-dark m-2 p-4" to="#">
              Ver mis Turnos
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
