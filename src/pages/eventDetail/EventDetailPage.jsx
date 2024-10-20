import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getEventById } from '../../services/eventService';
import './EventDetailPage.css';

function EventDetailsPage() {
  const { id } = useParams(); // Obtener el ID del evento desde la URL
  const location = useLocation(); // Obtener los parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const eventImage = queryParams.get('image'); // Obtener la imagen desde los parámetros

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los detalles del evento:', err);
        setError('Error al obtener los detalles del evento.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Cargando detalles del evento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      {/* Mostrar la imagen pasada en la URL */}
      <img src={eventImage} alt={event.name} className="event-image" />
      <p><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Ubicación:</strong> {event.location}</p>
      <p><strong>Descripción:</strong> {event.description}</p>
      <p><strong>Precio:</strong> ${event.price}</p>
      <p><strong>Boletos vendidos:</strong> {event.buyed_tickets}/{event.total_tickets}</p>

      <div className="button-container">
        <button className="primary-button">Comprar Entrada</button>
      </div>
    </div>
  );
}

export default EventDetailsPage;
