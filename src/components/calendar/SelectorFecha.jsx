import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import es from "../../../node_modules/date-fns/locale/es";
import { format } from "date-fns";

const SelectorFecha = ({ onDateSelect }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableSlots([]);
  };


  // Función para deshabilitar domingos y lunes
  const filterWeekdays = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 1; // 0 es domingo, 1 es lunes
  };


var apiTurnos = "http://localhost:1337/api/dia-turnos"

//printFechaQueEnvíoEnFormulario
const handleCheckAvailabilityPrint = () => {
  // Formatear la fecha seleccionada antes de enviarla
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  // Imprimir la fecha por consola
  console.log("Fecha seleccionada:", formattedDate);
}



//agregarDiaPOST
const handleCheckAvailability = async () => {
  try {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    // Verificar si la fecha ya existe
    const existingResponse = await fetch(apiTurnos);
    const existingData = await existingResponse.json();

    if (existingResponse.ok) {
      const dateExists = existingData.data.some(
        (item) => item.attributes.diaTurno === formattedDate
      );

      if (dateExists) {
        console.log("Fecha ya existe:", formattedDate);
        // Puedes manejar esto según tus necesidades, como mostrar un mensaje de error al usuario.
        return;
      }

      // Si la fecha no existe, realizar la solicitud POST
      const response = await fetch(apiTurnos, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            diaTurno: formattedDate,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Fecha creada:", formattedDate);
        // Actualizar la lista local (si es necesario)
        setAvailableSlots((prevSlots) => [
          ...prevSlots,
          { diaTurno: formattedDate },
        ]);
      } else {
        console.error("Error al crear la fecha:", data.error);
        // Puedes manejar esto según tus necesidades, como mostrar un mensaje de error al usuario.
      }
    } else {
      console.error("Error al obtener las fechas existentes:", existingData.error);
      // Puedes manejar esto según tus necesidades, como mostrar un mensaje de error al usuario.
    }
  } catch (error) {
    console.error("Error al consultar la disponibilidad:", error);
  }
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
            {availableSlots.map((slot) => (
              <li key={slot.hora}>
                {slot.hora} - {slot.disponible ? "Disponible" : "No disponible"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectorFecha;
