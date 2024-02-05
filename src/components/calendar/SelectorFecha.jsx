import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { format, addDays } from "date-fns";
import "../../styles/custom-table.css";

const SelectorFecha = ({ onDateSelect }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.getDay() === 0
      ? addDays(today, 2)
      : today.getDay() === 1
      ? addDays(today, 1)
      : today
  );
  const [availableSlots, setAvailableSlots] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    // Cuando se carga el componente, obtener los horarios disponibles del día seleccionado
    fetchDatesAndSlots(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableSlots([]);
    // No es necesario llamar fetchDatesAndSlots aquí porque useEffect ya lo hace al cambiar selectedDate
  };

  const filterWeekdays = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 1;
  };

  const apiTurnos = "http://localhost:1337/api/dia-turnos";

  const handleCheckAvailability = async () => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      const existingResponse = await fetch(apiTurnos);
      const existingData = await existingResponse.json();

      if (existingResponse.ok) {
        const dateExists = existingData.data.some(
          (item) => item.attributes.diaTurno === formattedDate
        );

        if (dateExists) {
          console.log("Fecha ya existe:", formattedDate);
        } else {
          const timeSlots = createTimeSlots();

          const response = await fetch(apiTurnos, {
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

      const response = await fetch(apiTurnos);
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

  const handleHorarioClick = (index, subIndex) => {
    setSelectedSlot({ diaIndex: index, horarioIndex: subIndex });
  };

  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="custom-date-input" onClick={onClick} ref={ref}>
      <span>{format(value, "EEEE, MMMM d, yyyy", { locale: es })}</span>
    </button>
  ));

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
  filterDate={filterWeekdays}
  customInput={<CustomDateInput />}
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
                    {horaSlot.hora} -{" "}
                    {horaSlot.disponible ? "Disponible" : "No disponible"}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectorFecha;
