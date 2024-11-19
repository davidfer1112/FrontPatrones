import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './ActividadEventos.css';
import FooterComponent from "../../components/footer/footerComponent";
import HeaderComponent from "../../components/header/headerComponent";

export default function ActividadEventos() {
    const [eventActivities, setEventActivities] = useState([]);
    const [accommodationActivities, setAccommodationActivities] = useState([]);
    const userId = Cookies.get('id');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const [eventResponse, accommodationResponse] = await Promise.all([
                    fetch(`https://backpatrones.onrender.com/api/event-activity-history/${userId}`),
                    fetch(`https://backpatrones.onrender.com/api/accommodation-activity-history/${userId}`)
                ]);

                const eventData = await eventResponse.json();
                const accommodationData = await accommodationResponse.json();

                setEventActivities(eventData);
                setAccommodationActivities(accommodationData);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();

        const interval = setInterval(fetchActivities, 5000); // Actualiza cada 5 segundos
        return () => clearInterval(interval);
    }, [userId]);

    const formatAction = (action) => {
        if (action.includes("inactive")) {
            return { text: "Salida", style: "salida" };
        }
        if (action.includes("active")) {
            return { text: "Entrada", style: "entrada" };
        }
        return { text: action, style: "" };
    };

    return (
        <div>
        <HeaderComponent />
            <div className="actividad-eventos-container">
            <header>
                <h1>Actividad en Tiempo Real</h1>
            </header>
            <div className="activities-section">
                <section>
                    <h2>Actividad de Eventos</h2>
                    <div className="activity-list">
                        {eventActivities.map(activity => {
                            const { text, style } = formatAction(activity.action);
                            return (
                                <div key={activity.activity_id} className={`activity-card ${style}`}>
                                    <p><strong>Acción:</strong> {text}</p>
                                    <p><strong>Evento ID:</strong> {activity.event_id}</p>
                                    <p><strong>Fecha:</strong> {new Date(activity.created_at).toLocaleString()}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section>
                    <h2>Actividad de Alojamientos</h2>
                    <div className="activity-list">
                        {accommodationActivities.map(activity => {
                            const { text, style } = formatAction(activity.action);
                            return (
                                <div key={activity.activity_id} className={`activity-card ${style}`}>
                                    <p><strong>Acción:</strong> {text}</p>
                                    <p><strong>Alojamiento ID:</strong> {activity.accommodation_id}</p>
                                    <p><strong>Fecha:</strong> {new Date(activity.created_at).toLocaleString()}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
        {/* <FooterComponent /> */}
        </div>
        
    );
}
