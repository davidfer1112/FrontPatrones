import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllAccommodations } from '../../services/accommodationService';
import { createUserAccommodationHistory } from '../../services/userAccommodationHistoryService';
import Cookies from 'js-cookie';
import './AlojamientoDetail.css';

function AlojamientoDetail() {
  const { id } = useParams(); // Obtiene el ID del alojamiento desde la URL
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAccommodationById = async () => {
      try {
        const accommodations = await getAllAccommodations(); // Llama al servicio
        const selectedAccommodation = accommodations.find(
          (accommodation) => accommodation.accommodation_id === parseInt(id, 10)
        ); // Filtra por ID
        if (selectedAccommodation) {
          setAccommodation(selectedAccommodation);
        } else {
          setError('Alojamiento no encontrado');
        }
      } catch (err) {
        setError('Error al obtener los detalles del alojamiento');
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationById();
  }, [id]);

  const handlePurchase = async () => {
    try {
      const userId = Cookies.get('id'); // Obtiene el ID del usuario desde la cookie
      if (!userId) throw new Error('Usuario no autenticado');

      const historyData = {
        user_id: parseInt(userId, 10), // ID del usuario
        accommodation_id: parseInt(id, 10), // ID del alojamiento seleccionado
        status: 'active', // Estado inicial
      };

      await createUserAccommodationHistory(historyData); // Crea la entrada en el historial
      setSuccessMessage('¡Compra realizada y registrada con éxito!');
    } catch (error) {
      setError(error.message || 'Error al realizar la compra');
    }
  };

  if (loading) {
    return <p>Cargando detalles del alojamiento...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="accommodation-detail-page">
      <div className="accommodation-detail-left">
        <img
          src={accommodation.image_url}
          alt={accommodation.name}
          className="accommodation-detail-image"
        />
      </div>
      <div className="accommodation-detail-right">
        <h1 className="accommodation-name">{accommodation.name}</h1>
        <p className="accommodation-price"><strong>Precio:</strong> {accommodation.price}</p>
        <p className="accommodation-location"><strong>Ubicación:</strong> {accommodation.location}</p>
        <p className="accommodation-description">{accommodation.description}</p>
        <button className="purchase-button" onClick={handlePurchase}>
          Comprar
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default AlojamientoDetail;
