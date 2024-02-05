import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import SelectorFecha from "./SelectorFecha";

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

  var barberosApi = "http://localhost:1337/api/barberos";
  var serviciosApi = "http://localhost:1337/api/productos";
  var diayhorariosApi = "http://localhost:1337/api/dia-turnos?populate=*";
  var horariosApi = "http://localhost:1337/api/horarios";

  const [barberos, setBarbero] = useState([]);
  const [servicios, setServicio] = useState([]);
  const [horarios2, setHorario2] = useState([]);

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(0);
  const [barberoFiltrado, setBarberoFiltrado] = useState("");
  const [servicioFiltrado, setServicioFiltrado] = useState("");

  const handleHorarioClick = (index) => {
    setHorarioSeleccionado(index);
  };

  const handleBarberoChange = (e) => {
    setBarberoFiltrado(e.target.value);
  };

  const handleServicioChange = (e) => {
    setServicioFiltrado(e.target.value);
  };

  //llamar a la api de barberos para que traiga los disponibles

  useEffect(() => {
    Axios.get(barberosApi)
      .then((response) => {
        const barberosNombres = response.data.data.map(
          (barbero) => barbero.attributes.nombre
        );
        setBarbero(barberosNombres);
      })
      .catch((error) => {
        console.log("error al obtener barberos", error);
      });
  }, []);

  //llamar a la pi de servicios para que traiga los nombres de los servicios disponibles
  useEffect(() => {
    Axios.get(serviciosApi)
      .then((response) => {
        const serviciosNombre = response.data.data.map(
          (servicio) => servicio.attributes.nombre
        );
        setServicio(serviciosNombre);
      })
      .catch((error) => {
        console.log("error al obtener los servicios", error);
      });
  }, []);

  //llamar a la api que me traiga los horarios

  return (
    <div className="container text-center mt-4 mb-4">
      <h1>Reservar Turno</h1>
      <hr />
      <div className="d-flex justify-content-between mb-4">
        {/* Filtro de barberos (corregido) */}
        <div>
          <label className="mb-2 fw-semibold mx-2">Barbero:</label>
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
          <label className="mb-2 fw-semibold mx-2">Servicio:</label>
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

      <hr />
      <h3>Seleccione fecha</h3>

      <SelectorFecha />

      <div className="footer row d-flex mx-4 align-items-end mx-auto uppercase">
        <button type="button" className="mt-4 btn btn-danger mt-2 p-4 pb-10">
          CONFIRMAR RESERVA
        </button>
        <NavLink className="btn btn-dark mt-2 p-4 pb-10" to="/">
          VOLVER
        </NavLink>
      </div>
    </div>
  );
};

export default TablaTurnos;
