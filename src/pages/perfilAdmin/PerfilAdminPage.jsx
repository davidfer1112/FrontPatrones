import React, { useEffect, useState } from 'react';
import { getUserEventHistory } from '../../services/userEventHistoryService';
import { getUserAccommodationHistory } from '../../services/userAccommodationHistoryService';
import { getEventById } from '../../services/eventService';
import { getAllAccommodations } from '../../services/accommodationService';
import { useNavigate } from 'react-router-dom';
import FooterComponent from "../../components/footer/footerComponent";
import HeaderComponent from "../../components/header/headerComponent";
import Cookies from 'js-cookie';
import './PerfilAdminPage.css';

export default function PerfilAdminPage() {
    const [eventHistory, setEventHistory] = useState([]);
    const [eventDetails, setEventDetails] = useState({});
    const [accommodationHistory, setAccommodationHistory] = useState([]);
    const [accommodationDetails, setAccommodationDetails] = useState({});
    const [isLoadingAccommodations, setIsLoadingAccommodations] = useState(true);
    const userId = Cookies.get('id');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventHistory = async () => {
            try {
                const history = await getUserEventHistory(userId);
                setEventHistory(history);

                const details = {};
                await Promise.all(
                    history.map(async (entry) => {
                        const event = await getEventById(entry.event_id);
                        details[entry.event_id] = event.name;
                    })
                );
                setEventDetails(details);
            } catch (error) {
                console.error("Error fetching event history:", error);
            }
        };

        const fetchAccommodationHistory = async () => {
            try {
                const history = await getUserAccommodationHistory(userId);
                 ("Accommodation History:", history);
                setAccommodationHistory(history);

                const allAccommodations = await getAllAccommodations();
                 ("All Accommodations:", allAccommodations);

                const accommodationMap = allAccommodations.reduce((map, accommodation) => {
                    map[accommodation.accommodation_id] = accommodation.name;
                    return map;
                }, {});
                 ("Accommodation Map:", accommodationMap);

                const details = history.reduce((acc, entry) => {
                    acc[entry.accommodation_id] =
                        accommodationMap[entry.accommodation_id] || "No disponible";
                    return acc;
                }, {});
                 ("Mapped Accommodation Details:", details);

                setAccommodationDetails(details);
            } catch (error) {
                console.error("Error fetching accommodation history or details:", error);
            } finally {
                setIsLoadingAccommodations(false);
            }
        };

        fetchEventHistory();
        fetchAccommodationHistory();
    }, [userId]);

    return (
        <div>
            <HeaderComponent />
            <div className="perfil-admin-container">
            <div className="header">
                <h1>Dashboard</h1>
                <p>Manage your events and accommodations</p>
            </div>

            <div className="history-wrapper">
                <section>
                    <h2>Eventos</h2>
                    <div className="card-container">
                        {eventHistory.map((entry) => (
                            <div key={entry.history_id} className="card">
                                <div className="card-content">
                                    <h3>Evento: {eventDetails[entry.event_id] || "Cargando..."}</h3>
                                    <p>ID: {entry.event_id}</p>
                                    <p>Status: <span className={`status ${entry.status}`}>{entry.status}</span></p>
                                    <button
                                        onClick={() =>
                                            navigate(`/estado-evento/${entry.event_id}?historyId=${entry.history_id}`)
                                        }
                                    >
                                        {entry.status === "active" ? "Desactivar" : "Activar"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2>Alojamientos</h2>
                    <div className="card-container">
                        {isLoadingAccommodations ? (
                            <p>Cargando alojamientos...</p>
                        ) : (
                            accommodationHistory.map((entry) => (
                                <div key={entry.history_id} className="card">
                                    <div className="card-content">
                                        <h3>Alojamiento: {accommodationDetails[entry.accommodation_id] || "No disponible"}</h3>
                                        <p>ID: {entry.accommodation_id}</p>
                                        <p>Status: <span className={`status ${entry.status}`}>{entry.status}</span></p>
                                        <button
                                            onClick={() =>
                                                navigate(`/estado-alojamiento/${entry.accommodation_id}?historyId=${entry.history_id}`)
                                            }
                                        >
                                            {entry.status === "active" ? "Desactivar" : "Activar"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
            
        </div>
            
        <FooterComponent />
        </div>
        
    );
}
