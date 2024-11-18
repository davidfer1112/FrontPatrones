import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getEventById } from '../../services/eventService';
import { createUserEventHistory } from '../../services/userEventHistoryService';
import { toast, Toaster } from 'react-hot-toast';
import FooterComponent from '../../components/footer/footerComponent';
import HeaderComponent from '../../components/header/headerComponent';
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
        setError('Error al obtener los detalles del evento.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handlePurchase = async () => {
    const userId = Cookies.get('id');
    try {
      await createUserEventHistory({
        user_id: parseInt(userId),
        event_id: parseInt(id),
        status: 'active',
      });

      toast.success('¡Evento pagado exitosamente!', {
        duration: 2000,
        position: 'top-center',
      });
    } catch (err) {
      toast.error('Error al registrar la compra del evento.', {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  if (loading) return <p>Cargando detalles del evento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <HeaderComponent />
      <div className="event-details-container">
      <Toaster />
      <h2 className="event-details-header">{event.name}</h2>
      <img src={eventImage} alt={event.name} className="event-details-image" />
      <p className="event-details-info">
        <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="event-details-info">
        <strong>Ubicación:</strong> {event.location}
      </p>
      <p className="event-details-info">
        <strong>Descripción:</strong> {event.description}
      </p>
      <p className="event-details-price">Precio: ${event.price}</p>
      <div className="event-button-container">
        <button className="event-primary-button" onClick={handlePurchase}>
          Comprar Entrada
        </button>
      </div>
    </div>
    <FooterComponent />

    </div>
    
  );
}

export default EventDetailsPage;
