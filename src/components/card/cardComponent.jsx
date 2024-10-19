import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventService';
import fiesta from '../../assets/fiesta.svg';
import fiesta2 from '../../assets/fiesta2.svg';
import fiesta3 from '../../assets/fiesta3.svg';
import './CardComponent.css';

function CardComponent() {
  const [events, setEvents] = useState([]);

  const images = [fiesta, fiesta2, fiesta3]; // Arreglo de imágenes

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();
        // Limitar a tres eventos
        setEvents(allEvents.slice(0, 3));
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="events-section">
      <h2 className="section-title text-center">Próximos eventos y alojamientos</h2>
      <div className="events-grid">
        {events.map((event, index) => (
          <div className="event-card" key={event.id_event}>
            <h3 className="card-title">{event.name}</h3>
            <img src={images[index]} alt={`Evento ${event.name}`} className="card-image" />
            <p className="card-date">Fecha: {new Date(event.date).toLocaleDateString()}</p>
            <p className="card-location">Ubicación: {event.location}</p>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="primary-button">Ver Eventos</button>
      </div>
    </section>
  );
}

export default CardComponent;
