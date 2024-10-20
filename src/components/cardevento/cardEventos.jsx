import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventService';
import { Link } from 'react-router-dom';  
import fiesta from '../../assets/fiesta.svg';
import fiesta2 from '../../assets/fiesta2.svg';
import fiesta3 from '../../assets/fiesta3.svg';
import './CardEventos.css';

function CardEventos() {
  const [events, setEvents] = useState([]);

  // Arreglo de imágenes para ciclar
  const images = [fiesta, fiesta2, fiesta3];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="event-list-container">
      <div className="event-list-grid">
        {events.map((event, index) => (
          <div className="event-item" key={event.id_event}>
            <h3 className="event-item-title">{event.name}</h3>
            <img
              src={images[index % images.length]}  
              alt={`Evento ${event.name}`}
              className="event-item-image"
            />
            <div className="event-item-details">
              <p className="event-item-date"><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p className="event-item-location"><strong>Ubicación:</strong> {event.location}</p>
              <p><strong>Precio:</strong> ${event.price}</p>
            </div>
            {/* Botón para ver los detalles del evento */}
            <Link
              to={`/eventos/${event.id_event}?image=${encodeURIComponent(images[index % images.length])}`}
              className="event-item-link"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardEventos;
