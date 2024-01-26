// SelectorFecha.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import es from "../../../node_modules/date-fns/locale/es";

const SelectorFecha = ({ onDateSelect }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableSlots([]);
  };

  const handleCheckAvailability = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      console.log("Fecha enviada al servidor:", formattedDate);

      const response = await fetch("http://localhost:1337/api/dia-turnos?populate=*");
      const data = await response.json();

      console.log("Respuesta de la API:", data);

      const fechaEncontrada = data?.data.find(item => item.attributes.diaTurno === formattedDate);

      if (fechaEncontrada) {
        let horariosDisponibles = fechaEncontrada.attributes.horario_turnos?.data?.map(horario => ({
          hora: horario.attributes.hora,
          disponible: horario.attributes.disponible
        })) || [];

        if (horariosDisponibles.length === 0) {
          // Si no hay horarios disponibles, crear un conjunto de horarios para ese día
          const todosLosHorarios = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
          horariosDisponibles = todosLosHorarios.map(hora => ({
            hora,
            disponible: true
          }));
        }

        console.log("Horarios disponibles para la fecha:", horariosDisponibles);
        setAvailableSlots(horariosDisponibles);

        if (onDateSelect) {
          onDateSelect(selectedDate, horariosDisponibles);
        }
      } else {
        console.log("No se encontró información para la fecha seleccionada.");
      }
    } catch (error) {
      console.error("Error al consultar la disponibilidad:", error);
    }
  };

  // Función para deshabilitar domingos y lunes
  const filterWeekdays = date => {
    const day = date.getDay();
    return day !== 0 && day !== 1; // 0 es domingo, 1 es lunes
  };

  return (
    <div className="selector-fecha">
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          locale={es}
          dateFormat="MMMM d, yyyy"
          minDate={today}
          className="text-center mb-1"
          filterDate={filterWeekdays} // Aplicar la función de filtrado
        />
      </div>
      <div className="mt-2">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleCheckAvailability}
        >
          VER DISPONIBILIDAD
        </button>
      </div>

      {availableSlots.length > 0 && (
        <div className="mt-3">
          <h4>Horarios disponibles:</h4>
          <ul>
            {availableSlots.map(slot => (
              <li key={slot.hora}>{slot.hora} - {slot.disponible ? 'Disponible' : 'No disponible'}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectorFecha;
