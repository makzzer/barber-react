import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="container-fluid d-flex navbar-dark navbar bg-dark p-4 ">
        <NavLink className="btn btn-outline-danger text-light" to="/">
          {" "}
          Home{" "}
        </NavLink>
        {/** <NavLink className="btn btn-outline-danger text-light" to="/turnos"> Turnos </NavLink>*/}
        <NavLink className="btn btn-outline-danger text-light" to="/ingresar">
          {" "}
          Ingresar{" "}
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
