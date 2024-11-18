import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserEventHistory, updateUserEventHistory } from '../../services/userEventHistoryService';
import { getUserAccommodationHistory, updateUserAccommodationHistory } from '../../services/userAccommodationHistoryService';
import { createAccessNotification } from '../../services/notificationService';
import maskIcon from '../../assets/mask-icon.svg';
import batmanSad from '../../assets/batmantriste.png';
import batmanHappy from '../../assets/batmanfeliz.jpg'; 
import './EstadoEventoAlojamientoPage.css';

export default function EstadoEventoAlojamientoPage() {
    const { id } = useParams(); // The ID of the event or accommodation
    const [status, setStatus] = useState(null); // Tracks the current status (active/inactive)
    const [isEvent, setIsEvent] = useState(true); // Determines if it's an event or accommodation
    const [showToast, setShowToast] = useState(false); // Toast visibility
    const [toastImage, setToastImage] = useState(null); // Toast image
    const [searchParams] = useSearchParams();
    const historyId = searchParams.get('historyId'); // Get the history ID from URL params

    // Fetch the status of the event or accommodation
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                console.log('History ID:', historyId);

                if (!historyId) {
                    console.error('Missing historyId in query params');
                    return;
                }

                const userId = Cookies.get('id'); // Fetch the user ID from cookies
                console.log('User ID:', userId);

                if (!userId) {
                    console.error('User ID is missing from cookies');
                    return;
                }

                if (window.location.pathname.includes("evento")) {
                    setIsEvent(true);
                    const eventHistories = await getUserEventHistory(userId); // Get all event histories for the user
                    const eventHistory = eventHistories.find(history => history.history_id.toString() === historyId);

                    if (eventHistory && eventHistory.status) {
                        setStatus(eventHistory.status);
                    } else {
                        console.error(`Event history not found for ID: ${historyId}`);
                        setStatus('inactive');
                    }
                } else {
                    setIsEvent(false);
                    const accommodationHistories = await getUserAccommodationHistory(userId); // Get all accommodation histories for the user
                    const accommodationHistory = accommodationHistories.find(history => history.history_id.toString() === historyId);

                    if (accommodationHistory && accommodationHistory.status) {
                        setStatus(accommodationHistory.status);
                    } else {
                        console.error(`Accommodation history not found for ID: ${historyId}`);
                        setStatus('inactive');
                    }
                }
            } catch (error) {
                console.error('Error fetching status:', error);
                setStatus('inactive');
            }
        };

        fetchStatus();
    }, [historyId]);

    // Toggle the status (active/inactive)
    const toggleStatus = async () => {
        try {
            const newStatus = status === 'active' ? 'inactive' : 'active';
            const userId = Cookies.get('id');

            if (isEvent) {
                await updateUserEventHistory(historyId, newStatus); // Update event status
            } else {
                await updateUserAccommodationHistory(historyId, newStatus); // Update accommodation status
            }

            setStatus(newStatus);

            // Send notification to the backend
            await createAccessNotification({
                user_id: parseInt(userId), // Parse user ID to integer
                event_id: isEvent ? parseInt(id) : null,
                accommodation_id: isEvent ? null : parseInt(id),
                type: isEvent ? 'event' : 'accommodation'
            });

            // Update the toast image based on the new status
            setToastImage(newStatus === 'inactive' ? batmanSad : batmanHappy);
            setShowToast(true);

            // Hide the toast after 3 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            console.error('Error updating status or sending notification:', error);
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
            <button 
                className="estado-toggle-button" 
                onClick={toggleStatus} 
                style={{ WebkitMaskImage: `url(${maskIcon})`, maskImage: `url(${maskIcon})` }}
            >
                <span className="estado-toggle-button-text">{status === 'active' ? 'Desactivar' : 'Activar'}</span>
            </button>
        </div>
    );
}
