import { useState } from 'react'
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import calendar from './assets/calendar.svg'
import evento from './assets/evento.svg'
import fiesta from './assets/fiesta.svg'
import logo from './assets/logo.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className='logo'>
            <img src={logo} alt="Logo de UNLOCK" className="logo-image"/>
            <h1 className="title">UNLOCK</h1>
          </div>
          <div className="search-container">
            <button className="button">
              <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                Explore
            </button>
          </div>
          <nav className="nav">
            <button className='btn'>
              <Link className="nav-link" to="/eventos">Eventos</Link>
            </button>
            <button className='btn'>
              <Link className="nav-link" to="/alojamientos">Alojamientos</Link>
            </button>
            <button className='btn'>
              <Link className="nav-link" to="/iniciar-sesion">Iniciar Sesión</Link>
            </button>
            
          </nav>
        </div>
      </header>


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

      <footer className="footer">
        <div className="footer-container">
          <div>
            <h3 className="footer-title">UNLOCK</h3>
            <p>Tu sistema de reserva de eventos de confianza</p>
          </div>
          <div>
            <h4 className="footer-subtitle">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/alojamientos">Alojamientos</Link></li>
              <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      
      
    </>
  )
}

export default App
