import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventService.js';
import { Link } from 'react-router-dom';
import './CardComponent.css';

function CardComponent() {
  const [events, setEvents] = useState([]);

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
        {events.map((event) => (
          <div className="event-card" key={event.event_id}>
            <h3 className="card-title">{event.name}</h3>
            <img 
              src={event.image_url} 
              alt={`Evento ${event.name}`} 
              className="card-image" 
              onError={(e) => { e.target.src = '/fallback-image.jpg'; }} // Imagen de respaldo si `image_url` falla
            />
            <p className="card-date">Fecha: {new Date(event.date_time).toLocaleDateString()}</p>
            <p className="card-location">Ubicación: {event.location}</p>
            <Link 
              to={`/eventos/${event.event_id}`}
              className="event-link"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
      <div className="button-container">
        <Link to="/eventos">
          <button className="primary-button">Ver Eventos</button>
        </Link>
      </div>
    </section>
  );
}

export default CardComponent;
