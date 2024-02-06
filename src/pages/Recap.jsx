import { NavLink } from "react-router-dom";

const Recap = () => {
  const selectedService = "Corte de cabello";
  const selectedBarber = "Juan Pérez";
  const selectedDate = new Date(2024, 1, 1); // Asumiendo que los meses son 0 indexados (enero = 0)
  const selectedTime = "15:00";
  const bookingPrice = 20;

  return (
    <div className="mt-5 container">
      <h2 className="mb-4">Resumen de la reserva</h2>
      <div className="recap-container">
        <div>
          <p>Servicio seleccionado:</p>
          <h4>{selectedService}</h4>
        </div>
        <div>
          <p>Barbero seleccionado:</p>
          <h4>{selectedBarber}</h4>
        </div>
      </div>
      <div className="recap-container">
        <div>
          <p>Fecha seleccionada:</p>
          <h4>{selectedDate.toDateString()}</h4>
        </div>
        <div>
          <p>Horario seleccionado:</p>
          <h4>{selectedTime}</h4>
        </div>
      </div>
      <div className="recap-container">
        <div>
          <p>Precio de seña a abonar:</p>
          <h4>{bookingPrice} USD</h4>
        </div>
      </div>

      <div className="footer row d-flex mx-4 align-items-end mx-auto uppercase">
        <NavLink className="mt-4 btn btn-danger mt-2 p-4 pb-10" to="/recap">
          CONFIRMAR RESERVA
        </NavLink>
        <NavLink className="btn btn-dark mt-2 p-4 pb-10" to="/">
          VOLVER
        </NavLink>
      </div>
    </div>
  );
};

export default Recap;
