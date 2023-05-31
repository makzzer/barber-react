import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="container navbar-dark navbar bg-warning p-4">
        <NavLink className="btn btn-outline-dark" to="/"> Home </NavLink>
        <NavLink className="btn btn-outline-dark" to="/about"> About </NavLink>
        <NavLink className="btn btn-outline-dark" to="/blog"> Blog </NavLink>
        <NavLink className="btn btn-outline-dark" to="/chino"> Chino </NavLink>
      </div>
    </>
  );
};

export default Navbar;
