
import React, { useEffect, useState } from 'react';
import { getAllAccommodations } from '../../services/accommodationService';
import fiesta from '../../assets/fiesta.svg';
import fiesta2 from '../../assets/fiesta2.svg';
import fiesta3 from '../../assets/fiesta3.svg';
import './CardAlojamiento.css';

function CardAlojamiento() {
  const [accommodations, setAccommodations] = useState([]);

  // Arreglo de imágenes para ciclar
  const images = [fiesta, fiesta2, fiesta3];

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
        {accommodations.map((accommodation, index) => (
          <div className="accommodation-item" key={accommodation.id_accommodation}>
            <h3 className="accommodation-item-title">{accommodation.name}</h3>
            <img
              src={images[index % images.length]}
              alt={`Alojamiento ${accommodation.name}`}
              className="accommodation-item-image"
            />
            <p className="accommodation-item-location"><strong>Ubicación:</strong> {accommodation.location}</p>
            <p className="accommodation-item-price"><strong>Precio:</strong> ${accommodation.price}</p>
            <p className="accommodation-item-capacity"><strong>Capacidad:</strong> {accommodation.capacity} personas</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardAlojamiento;
