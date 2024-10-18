
import FooterComponent from "../../components/footer/footerComponent";
import HeaderComponent from "../../components/header/headerComponent"
import calendar from "../../assets/calendar.svg";
import evento from "../../assets/evento.svg";
import fiesta from "../../assets/fiesta.svg";
import "./HomePage.css";


function HomePage() {
  return (
    <div>

      <HeaderComponent />


      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="section-title">UNLOCK</h2>
              <ul className="features-list">
              <br />
                <li>Horarios de Eventos</li>
                <li>Calendario de Eventos</li>
                <li>Eventos de Hoy</li>
                <li>Programación de Eventos Actuales</li>
              </ul>
            </div>
            <div className="hero-image">
              <img src={calendar} alt="Ilustración de evento" className="image" />
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-content">
          <div className="info-image">
              <img src={evento} alt="Mesa de evento" className="image" />
            </div>
            <div className="info-text">
              <h2 className="section-title">Gestiona tus eventos y alojamientos</h2>
              <p className="info-description">
                Unlock es tu aplicación web de confianza para una gestión fluida de eventos y alojamientos. Regístrate, busca y reserva con facilidad. Experimenta la comodidad al alcance de tus dedos.
              </p>
            </div>
          </div>
        </section>

        <section className="events-section">
          <h2 className="section-title text-center">Próximos eventos y alojamientos</h2>
          <div className="events-grid">
            <div className="event-card">
              <h3 className="card-title">Nombre del Evento</h3>
              <img src={fiesta} alt="Evento" className="card-image" />
              <p className="card-description">Explora un mundo de posibilidades ilimitadas. Sumérgete en el arte contemporáneo, la cultura y la tecnología desde una perspectiva completamente nueva.</p>
            </div>
            <div className="event-card">
              <h3 className="card-title">Nombre del Evento: Cambio de Perspectiva</h3>
              <img src={fiesta} alt="Evento" className="card-image" />
              <p className="card-description">Una colección de eventos que redefinen perspectivas y desafían las normas establecidas.</p>
            </div>
            <div className="event-card">
              <h3 className="card-title">Nombre del Evento: Evolución</h3>
              <img src={fiesta} alt="Evento" className="card-image" />
              <p className="card-description">Embárcate en un viaje de transformación. Descubre la belleza del cambio y el crecimiento a través del arte.</p>
            </div>
          </div>
          <div className="button-container">
            <button className="primary-button">Ver Eventos</button>
          </div>
        </section>
      </main>

      <FooterComponent />
    </div>
  );
}

export default HomePage;