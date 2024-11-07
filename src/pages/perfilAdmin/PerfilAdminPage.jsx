import React, { useEffect, useState } from 'react';
import { getUserEventHistory } from '../../services/userEventHistoryService';
import { getUserAccommodationHistory } from '../../services/userAccommodationHistoryService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './PerfilAdminPage.css';

export default function PerfilAdminPage() {
    const [eventHistory, setEventHistory] = useState([]);
    const [accommodationHistory, setAccommodationHistory] = useState([]);
    const userId = Cookies.get('id'); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventHistory = async () => {
            try {
                const history = await getUserEventHistory(userId);
                setEventHistory(history);
            } catch (error) {
                console.error('Error fetching event history:', error);
            }
        };

        const fetchAccommodationHistory = async () => {
            try {
                const history = await getUserAccommodationHistory(userId);
                setAccommodationHistory(history);
            } catch (error) {
                console.error('Error fetching accommodation history:', error);
            }
        };

        fetchEventHistory();
        fetchAccommodationHistory();
    }, [userId]);

    return (
        <div className="perfil-admin-container">
            <h1>Perfil de Administrador</h1>
            
            <div className="history-section">
                <h2>Historial de Eventos</h2>
                <ul>
                    {eventHistory.map((entry) => (
                        <li key={entry.history_id} className="history-item">
                            <p><strong>Evento ID:</strong> {entry.event_id}</p>
                            <p><strong>Estado:</strong> {entry.status}</p>
                            <button onClick={() => navigate(`/estado-evento/${entry.event_id}?historyId=${entry.history_id}`)}>
                                <span>{entry.status === 'active' ? 'Desactivar' : 'Activar'}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="history-section">
                <h2>Historial de Alojamientos</h2>
                <ul>
                    {accommodationHistory.map((entry) => (
                        <li key={entry.history_id} className="history-item">
                            <p><strong>Alojamiento ID:</strong> {entry.accommodation_id}</p>
                            <p><strong>Estado:</strong> {entry.status}</p>
                            <button onClick={() => navigate(`/estado-alojamiento/${entry.accommodation_id}?historyId=${entry.history_id}`)}>
                                <span>{entry.status === 'active' ? 'Desactivar' : 'Activar'}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
