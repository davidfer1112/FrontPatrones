import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventService';
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
    <section className="events-section">
      
      <div className="events-grid">
        {events.map((event, index) => (
          <div className="event-card" key={event.id_event}>
            <h3 className="card-title">{event.name}</h3>
            <img
              src={images[index % images.length]}  
              alt={`Evento ${event.name}`}
              className="card-image"
            />
            <p className="card-date"><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className="card-location"><strong>Ubicación:</strong> {event.location}</p>
            <p><strong>Precio:</strong> ${event.price}</p>
           
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardEventos;
