import React, { useEffect, useState } from 'react';
import { getAllAccommodations } from '../../services/accommodationService';
import './CardAlojamiento.css';

function CardAlojamiento() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const allAccommodations = await getAllAccommodations();
        setAccommodations(allAccommodations);
      } catch (error) {
        console.error('Error al obtener los alojamientos:', error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <section className="accommodation-list-container">
      <div className="accommodation-list-grid">
        {accommodations.map((accommodation) => (
          <div className="accommodation-item" key={accommodation.accommodation_id}>
            <h3 className="accommodation-item-title">{accommodation.name}</h3>
            <img
              src={accommodation.image_url}
              alt={`Alojamiento ${accommodation.name}`}
              className="accommodation-item-image"
              onError={(e) => { e.target.src = '/fallback-image.jpg'; }} // Imagen de respaldo si `image_url` falla
            />
            <p className="accommodation-item-location"><strong>Ubicación:</strong> {accommodation.location}</p>
            <p className="accommodation-item-contact"><strong>Contacto:</strong> {accommodation.contact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardAlojamiento;
