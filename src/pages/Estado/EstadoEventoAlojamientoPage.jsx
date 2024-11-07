import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Importar Cookies
import { getUserEventHistory, createUserEventHistory } from '../../services/userEventHistoryService';
import { getUserAccommodationHistory, createUserAccommodationHistory } from '../../services/userAccommodationHistoryService';
import './EstadoEventoAlojamientoPage.css';

export default function EstadoEventoAlojamientoPage() {
    const { id } = useParams();
    const [status, setStatus] = useState(null);
    const [isEvent, setIsEvent] = useState(true); 
    const navigate = useNavigate();

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
            const userId = Cookies.get('id'); // Obtener el ID del usuario desde la cookie

            if (isEvent) {
                await createUserEventHistory({ user_id: userId, event_id: id, status: newStatus });
            } else {
                await createUserAccommodationHistory({ user_id: userId, accommodation_id: id, status: newStatus });
            }
            setStatus(newStatus);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="estado-page">
            <h2>{isEvent ? 'Cambiar Estado del Evento' : 'Cambiar Estado del Alojamiento'}</h2>
            <button onClick={toggleStatus}>
                <span>{status === 'active' ? 'Desactivar' : 'Activar'}</span>
            </button>
        </div>
    );
}
