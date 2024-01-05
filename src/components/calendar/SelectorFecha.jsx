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
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleSave = () => {
      console.log("Fecha seleccionada:", selectedDate);
      // Puedes realizar acciones adicionales con la fecha seleccionada aquí
      onClose();
    };
  
    const timeOptions = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
  
    const convertToTime = (timeString) => {
      const [hours, minutes] = timeString.split(":");
      return new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(hours), parseInt(minutes));
    };
  
    const timeOptionsObjects = timeOptions.map(convertToTime);
  
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
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog" role="document" style={{ margin: "10% auto" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Seleccionar Fecha y Hora</h5>
                  <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    locale={es}
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={today}
                    maxDate={twoWeeksLater}
                    includeTimes={timeOptionsObjects}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Guardar
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
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
