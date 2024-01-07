import React from "react";
import "../../styles/custom-card.css"

const CardTurno = ({ title, dateTime, barber, reservationDate, clientName, depositAmount }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">
          <strong>Fecha y Hora:</strong> {dateTime}
        </p>
        <p className="card-text">
          <strong>Barbero:</strong> {barber}
        </p>
        <p className="card-text">
          <strong>Cliente:</strong> {clientName}
        </p>
        <p className="card-text">
          <strong>Seña:</strong> ${depositAmount}
        </p>
        <p className="card-text">
          <strong>Reserva realizada:</strong> {reservationDate}
        </p>
      </div>
    </div>
  );
};



export default CardTurno;