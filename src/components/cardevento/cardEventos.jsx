import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventService';
import { Link } from 'react-router-dom';  
import './cardEventos.css';

function CardEventos() {
  const [events, setEvents] = useState([]);

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
        {events.map((event) => (
          <div className="event-item" key={event.event_id || event.id_event}>
            <h3 className="event-item-title">{event.name}</h3>
            <img
              src={event.image_url || '/fallback-image.jpg'} 
              alt={`Evento ${event.name}`}
              className="event-item-image"
            />
            <div className="event-item-details">
              <p className="event-item-date"><strong>Fecha:</strong> {new Date(event.date_time).toLocaleDateString()}</p>
              <p className="event-item-location"><strong>Ubicación:</strong> {event.location}</p>
              <p><strong>Precio:</strong> ${event.price}</p>
            </div>
            <Link
              to={`/eventos/${event.event_id || event.id_event}?image=${encodeURIComponent(event.image_url || '/fallback-image.jpg')}`}
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
