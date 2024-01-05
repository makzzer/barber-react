import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SelectorFecha from "../components/calendar/SelectorFecha";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "../styles/custom-btn.css"


const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (e) => {
    e.stopPropagation(); // Evita que el evento se propague y se ejecute en el modal inmediatamente después de abrirse
    console.log("abriiiiiii");
    setModalOpen(true);
  };
  

  const closeModal = () => {
    console.log("cerreeeeee")
    setModalOpen(false);
  };

  const handleDateSelect = (selectedDate) => {
    console.log("Fecha seleccionada:", selectedDate);
    // Puedes realizar acciones adicionales con la fecha seleccionada aquí
  };

  return (
    <>
      <div className="container text-center mt-4 mb-4">
        <h1 className="mb-8">LA BARBER</h1>
      </div>

      <div className="container text-center text-uppercase">
        <div className="row d-flex gap-2 bg-body-tertiary">
          <div className="d-flex flex-column m-2 uppercase">

            <button className="btn btn-dark m-2 p-4 pb-10 text-uppercase" onClick={openModal}>
              Reservar Turno
            </button>


            <NavLink className="btn btn-secondary  m-2 p-4 pb-10" to="#">
              Gestionar mis Turnos
            </NavLink>
          </div>
        </div>
      </div>

      <SelectorFecha isOpen={isModalOpen} onClose={closeModal} onDateSelect={handleDateSelect} />
    </>
  );
};

export default Home;
