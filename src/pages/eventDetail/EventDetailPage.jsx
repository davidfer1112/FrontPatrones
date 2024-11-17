import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getEventById } from '../../services/eventService';
import { createUserEventHistory } from '../../services/userEventHistoryService';
import { toast, Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import './EventDetailPage.css';

function EventDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventImage = queryParams.get('image');

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

  const handlePurchase = async () => {
    const userId = Cookies.get('id'); // Obtener el ID del usuario de las cookies
    try {
      await createUserEventHistory({
        user_id: parseInt(userId), // ID del usuario
        event_id: parseInt(id), // ID del evento
        status: 'active' // Estado de la entrada en el historial, como 'active' para indicar la compra
      });

      // Mostrar mensaje de éxito en un toast
      toast.success('¡Evento pagado exitosamente!', {
        duration: 2000,
        position: 'top-center',
        iconTheme: {
          primary: '#4CAF50',
          secondary: '#fff',
        },
      });
    } catch (err) {
      console.error('Error al registrar la compra en el historial:', err);
      toast.error('Error al registrar la compra del evento.', {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  if (loading) return <p>Cargando detalles del evento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-details">
      <Toaster />
      <h2>{event.name}</h2>
      <img src={eventImage} alt={event.name} className="event-image" />
      <p><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Ubicación:</strong> {event.location}</p>
      <p><strong>Descripción:</strong> {event.description}</p>
      <p><strong>Precio:</strong> ${event.price}</p>
    
      <div className="button-container">
        <button className="primary-button" onClick={handlePurchase}>Comprar Entrada</button>
      </div>
    </div>
  );
}

export default EventDetailsPage;
