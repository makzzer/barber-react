import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays } from "date-fns";
import "../styles/custom-table.css";
import es from "date-fns/locale/es";



const ReservaTurno = () => {
  const [barberos, setBarbero] = useState([]);
  const [servicios, setServicio] = useState([]);
  const [horarios2, setHorario2] = useState([]);

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(0);
  const [barberoFiltrado, setBarberoFiltrado] = useState("");
  const [servicioFiltrado, setServicioFiltrado] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const today = new Date();

  useEffect(() => {
    // Obtener barberos
    Axios.get("http://localhost:1337/api/barberos")
      .then((response) => {
        const barberosNombres = response.data.data.map(
          (barbero) => barbero.attributes.nombre
        );
        setBarbero(barberosNombres);
      })
      .catch((error) => {
        console.log("Error al obtener barberos", error);
      });

    // Obtener servicios
    Axios.get("http://localhost:1337/api/productos")
      .then((response) => {
        const serviciosNombre = response.data.data.map(
          (servicio) => servicio.attributes.nombre
        );
        setServicio(serviciosNombre);
      })
      .catch((error) => {
        console.log("Error al obtener los servicios", error);
      });
  }, []);

  const handleHorarioClick = (index, subIndex) => {
    setSelectedSlot({ diaIndex: index, horarioIndex: subIndex });
  };

  const handleBarberoChange = (e) => {
    setBarberoFiltrado(e.target.value);
  };

  const handleServicioChange = (e) => {
    setServicioFiltrado(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableSlots([]);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleCheckAvailability = async () => {
    try {
      if (!selectedDate) {
        console.log("Seleccione una fecha");
        return;
      }

      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      const existingResponse = await fetch("http://localhost:1337/api/dia-turnos");
      const existingData = await existingResponse.json();

      if (existingResponse.ok) {
        const dateExists = existingData.data.some(
          (item) => item.attributes.diaTurno === formattedDate
        );

        if (dateExists) {
          console.log("Fecha ya existe:", formattedDate);
        } else {
          const timeSlots = createTimeSlots();

          const response = await fetch("http://localhost:1337/api/dia-turnos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                diaTurno: formattedDate,
                horarios: timeSlots,
              },
            }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log("Fecha creada:", formattedDate);
            setAvailableSlots([
              { diaTurno: formattedDate, horarios: timeSlots },
              ...availableSlots,
            ]);
          } else {
            console.error("Error al crear la fecha:", data.error);
          }
        }
      } else {
        console.error(
          "Error al obtener las fechas existentes:",
          existingData.error
        );
      }

      // Actualizar el listado después de la creación o verificación de la fecha
      fetchDatesAndSlots(selectedDate);
    } catch (error) {
      console.error("Error al consultar la disponibilidad:", error);
    }
  };

  const createTimeSlots = () => {
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

    return horarios.map((hora) => ({ hora, disponible: true }));
  };

  const fetchDatesAndSlots = async (date) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");

      const response = await fetch("http://localhost:1337/api/dia-turnos");
      const data = await response.json();

      if (response.ok) {
        const slotsData = data.data
          .filter((item) => item.attributes.diaTurno === formattedDate)
          .map((item) => ({
            diaTurno: item.attributes.diaTurno,
            horarios: item.attributes.horarios || createTimeSlots(),
          }));

        setAvailableSlots(slotsData);
      } else {
        console.error("Error al obtener las fechas existentes:", data.error);
      }
    } catch (error) {
      console.error("Error al consultar la disponibilidad:", error);
    }
  };

  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="custom-date-input" onClick={onClick} ref={ref}>
      <span>{format(value, "EEEE, MMMM d, yyyy", { locale: es })}</span>
    </button>
  ));

  return (
    <div className="container text-center mt-4 mb-4">
      <h1>Reservar Turno</h1>
      <hr />
      <div className="d-flex justify-content-between mb-4">
        {/* Filtro de barberos */}
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

      <div className="selector-fecha">
        <div className="d-flex flex-row justify-content-center align-items-center gap-4 mt-2">
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={es}
              dateFormat="MMMM d, yyyy"
              minDate={today}
              className="text-center mb-1"
              customInput={<CustomDateInput />}
            />
          </div>
          <div className="">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleCheckAvailability}
            >
              VER DISPONIBILIDAD
            </button>
          </div>
        </div>

        <hr />

        {availableSlots.length > 0 && (
          <div className="mt-3">
            <h4>Horarios disponibles:</h4>
            <div className="list-group">
              {availableSlots.map((slot, index) => (
                <div key={index}>
                  {slot.horarios.map((horaSlot, subIndex) => (
                    <button
                      key={subIndex}
                      type="button"
                      className={`list-group-item list-group-item-action ${
                        selectedSlot &&
                        index === selectedSlot.diaIndex &&
                        subIndex === selectedSlot.horarioIndex
                          ? horaSlot.disponible
                            ? "selected-available"
                            : "selected-unavailable"
                          : horaSlot.disponible
                          ? "available"
                          : "unavailable"
                      }`}
                      onClick={() => handleHorarioClick(index, subIndex)}
                    >
                      <div className="d-flex justify-content-center gap-2">
                        <div>{horaSlot.hora}</div>
                        <div>-</div>
                        <div>
                          {horaSlot.disponible
                            ? "Disponible"
                            : "No disponible"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="footer row d-flex mx-4 align-items-end mx-auto uppercase">
        <NavLink
          className="mt-4 btn btn-danger mt-2 p-4 pb-10"
          to="/recap"
          disabled={!selectedDate || !selectedSlot}
        >
          CONFIRMAR RESERVA
        </NavLink>
        <NavLink className="btn btn-dark mt-2 p-4 pb-10" to="/">
          VOLVER
        </NavLink>
      </div>
    </div>
  );
};

export default ReservaTurno;