import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserEventHistory, updateUserEventHistory } from '../../services/userEventHistoryService';
import { getUserAccommodationHistory, updateUserAccommodationHistory } from '../../services/userAccommodationHistoryService';
import maskIcon from '../../assets/mask-icon.svg';
import batmanSad from '../../assets/batmantriste.png';
import batmanHappy from '../../assets/batmanfeliz.jpg'; 
import './EstadoEventoAlojamientoPage.css';

export default function EstadoEventoAlojamientoPage() {
    const { id } = useParams();
    const [status, setStatus] = useState(null);
    const [isEvent, setIsEvent] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastImage, setToastImage] = useState(null);
    const [searchParams] = useSearchParams();
    const historyId = searchParams.get('historyId'); // Obtener el historyId desde la URL

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                if (window.location.pathname.includes("evento")) {
                    setIsEvent(true);
                    const eventHistory = await getUserEventHistory(id);
                    if (eventHistory && eventHistory[0]) {
                        setStatus(eventHistory[0].status);
                    }
                } else {
                    setIsEvent(false);
                    const accommodationHistory = await getUserAccommodationHistory(id);
                    if (accommodationHistory && accommodationHistory[0]) {
                        setStatus(accommodationHistory[0].status);
                    }
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchStatus();
    }, [id]);

    const toggleStatus = async () => {
        try {
            const newStatus = status === 'active' ? 'inactive' : 'active';

            if (isEvent) {
                await updateUserEventHistory(historyId, newStatus);
            } else {
                await updateUserAccommodationHistory(historyId, newStatus);
            }

            setStatus(newStatus);

            setToastImage(newStatus === 'inactive' ? batmanSad : batmanHappy);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const backgroundColor = status === 'active' ? '#1C1C1C' : '#2E2E2E';

    return (
        <div className="estado-page" style={{ backgroundColor }}>
            {showToast && (
                <div className="toast">
                    <img src={toastImage} alt="Batman" />
                </div>
            )}
            <h2>{isEvent ? 'Cambiar Estado del Evento' : 'Cambiar Estado del Alojamiento'}</h2>
            <button className="estado-toggle-button" onClick={toggleStatus} style={{ WebkitMaskImage: `url(${maskIcon})`, maskImage: `url(${maskIcon})` }}>
                <span className="estado-toggle-button-text">{status === 'active' ? 'Desactivar' : 'Activar'}</span>
            </button>
        </div>
    );
}
