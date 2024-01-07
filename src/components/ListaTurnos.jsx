import React from "react";
import CardTurno from "../components/cards/CardTurno";
import "../styles/custom-card.css"

const ListaTurnos = () => {
  // Valores de muestra
  const sampleTurnos = [
    {
      title: "Corte",
      dateTime: "Viernes 13 de enero de 2024 a las 14:30",
      barber: "Dani",
      reservationDate: "13/01/2024 10:00",
      clientName: "Maxi",
      depositAmount: 1000,
    },
    {
      title: "Corte y Barba",
      dateTime: "Sábado 14 de enero de 2024 a las 12:00",
      barber: "Cris",
      reservationDate: "13/01/2024 14:30",
      clientName: "Maxi",
      depositAmount: 1000,
    },
    {
      title: "Corte",
      dateTime: "Domingo 15 de enero de 2024 a las 15:45",
      barber: "Dani",
      reservationDate: "14/01/2024 09:45",
      clientName: "Maxi",
      depositAmount: 1000,
    },
  ];
  

  return (
    <div className="list-group">
      <div className="custom-container"> {/* Agregué un contenedor con fondo gris */}
        {sampleTurnos.map((turno, index) => (
          <CardTurno key={index} {...turno} />
        ))}
      </div>
    </div>
  );
};

export default ListaTurnos;
