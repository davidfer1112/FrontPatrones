import { Link } from 'react-router-dom';

function footerComponent() {
  return (
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
  );
}

export default footerComponent;