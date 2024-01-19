import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const TablaTurnos = () => {
  const horarios = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(0);
  const [barberoFiltrado, setBarberoFiltrado] = useState("");
  const [servicioFiltrado, setServicioFiltrado] = useState("");

  const barberos = ["Dani", "Cris", "Mariano"];
  const servicios = ["Corte", "Corte y barba", "Barba"];

  const handleHorarioClick = (index) => {
    setHorarioSeleccionado(index);
  };

  const handleBarberoChange = (e) => {
    setBarberoFiltrado(e.target.value);
  };

  const handleServicioChange = (e) => {
    setServicioFiltrado(e.target.value);
  };

  return (
    <div className="container text-center mt-4 mb-4">
      <div className="d-flex justify-content-between mb-4">
        {/* Filtro de barberos (corregido) */}
        <div>
          <label className="mb-2 fw-semibold">Barbero:</label>
          <select
            value={barberoFiltrado}
            onChange={handleBarberoChange}
            style={{ marginTop: "5px" }}
          >
            {barberos.map((barbero, index) => (
              <option key={index} value={barbero}>
                {barbero}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de servicios */}
        <div>
          <label className="mb-2 fw-semibold">Seleccione Servicio:</label>
          <select
            onChange={handleServicioChange}
            value={servicioFiltrado}
            style={{ marginTop: "5px" }}
          >
            {servicios.map((servicio, index) => (
              <option key={index} value={servicio}>
                {servicio}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h3>Seleccione horario</h3>
      <div className="list-group">
        {horarios.map((horario, index) => (
          <button
            key={index}
            type="button"
            className={`list-group-item list-group-item-action ${
              index === horarioSeleccionado ? "list-group-item-secondary" : ""
            }`}
            onClick={() => handleHorarioClick(index)}
          >
            {horario}
          </button>
        ))}


        
      </div>

      <div className="footer row  d-flex mx-4 align-items-end gap-4 mx-auto">

        <button type="button" className="mt-4 btn btn-danger">
          Confirmar reserva
        </button>
        <NavLink  className="btn btn-secondary" to="/">
          Volver
        </NavLink>
      </div>
      
    </div>
  );
};

export default TablaTurnos;
