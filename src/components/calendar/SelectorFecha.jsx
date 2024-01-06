// SelectorFecha.jsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";
import es from "../../../node_modules/date-fns/locale/es";

const SelectorFecha = ({ isOpen, onClose, onDateSelect }) => {
  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 14);

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedBarbero, setBarbero] = useState("");
  const [selectedServicio, setServicio] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBarberoChange = (e) => {
    setBarbero(e.target.value);
  };

  const handleServicioChange = (e) => {
    setServicio(e.target.value);
  };

  const handleSave = () => {
    console.log("Fecha seleccionada:", selectedDate);
    console.log("Hora seleccionada:", selectedTime);
    onClose();
  };

  const timeOptions = [
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

  const barberos = ["Dani", "Cris", "Barbero X"];

  const servicios = ["Corte", "Corte y barba"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return createPortal(
    <>
      {isOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
      )}

      {isOpen ? (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div
            className="modal-dialog"
            role="document"
            style={{
              marginTop: "15%", // Ajusta el margen superior según sea necesario
              marginBottom: "2%", // Ajusta el margen inferior según sea necesario
              minHeight: "60vh", // Ajusta la altura mínima según sea necesario
              maxHeight: "96%", // Ajusta la altura máxima según sea necesario
              overflowY: "auto",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reservar turno</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>

              <div
                className="modal-body d-flex flex-column"
                style={{ textAlign: "center" }}
              >
                {/* Acá arranca el contenido del body de la reserva de turnos */}

                <div className="d-flex flex-row">
                  {/* Espaciador vertical para alinear los elementos */}
                  <div style={{ marginTop: "10px" }}></div>

                  {/* Espaciador vertical para alinear los elementos */}
                  <div style={{ marginTop: "10px" }}></div>

                  {/* Columna de Servicio */}

                  <div className="d-flex flex-row">
                    {/* select de barbero */}
                    <div className="d-flex flex-column ms-2">
                      <div>
                        <h6>Seleccione Barbero</h6>
                      </div>

                      <div className="">
                        <select
                          value={selectedBarbero}
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
                    </div>

                    <div className="d-flex flex-column ms-4">
                      <div>
                        <h6>Seleccione servicio</h6>
                      </div>

                      <div className="">
                        <select
                          value={selectedServicio}
                          onChange={handleServicioChange}
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
                  </div>
                </div>

                <hr className="mt-4 mb-4"></hr>

                <div className="d-flex flex-row">
                  {/* Columna de fecha */}
                  <div className="d-flex flex-column">
                    <div>
                      <h6 className="">Seleccione Día</h6>
                    </div>
                    <div>
                      <DatePicker
                        className="ms-2"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        locale={es}
                        dateFormat="MMMM d, yyyy"
                        minDate={today}
                        maxDate={twoWeeksLater}
                      />
                    </div>
                  </div>

                  {/* Espaciador vertical para alinear los elementos */}
                  <div style={{ marginTop: "10px" }}></div>

                  {/* Columna de hora */}
                  <div className="d-flex flex-column ms-4">
                    <div>
                      <h6>Disponibilidad</h6>
                    </div>

                    <div className="">
                      <select
                        value={selectedTime}
                        onChange={handleTimeChange}
                        style={{ marginTop: "5px" }}
                      >
                        {timeOptions.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleSave}
                >
                  Confirmar reserva
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.body
  );
};

export default SelectorFecha;
