import FooterComponent from "../../components/footer/footerComponent";
import HeaderComponent from "../../components/header/headerComponent";
import calendar from "../../assets/calendar.svg";
import evento from "../../assets/evento.svg";
import CardComponent from "../../components/card/cardComponent"; 
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

        <CardComponent />
        
      </main>

      <FooterComponent />
    </div>
  );
}

export default HomePage;
