import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "../styles/custom-btn.css"

const Home = () => {
  return (
    <>
      <div className="container text-center mt-4 mb-4">
        <h1 className="mb-8">LA BARBER</h1>
      </div>

      <div className="container text-center text-uppercase">
        <div className="row d-flex gap-2 bg-body-tertiary">
          <div className="d-flex flex-column m-2 uppercase">
            <NavLink
              className="btn btn-dark  m-2 p-4 pb-10"
              to="/reservarturnos"
            >
              Reservar Turno
            </NavLink>

            <NavLink className="btn btn-secondary  m-2 p-4 pb-10" to="/turnos">
              Mis Turnos
            </NavLink>
          </div>
        </div>
      </div>

      {/*<SelectorFecha isOpen={isModalOpen} onClose={closeModal} onDateSelect={handleDateSelect} />*/}
    </>
  );
};

export default Home;
