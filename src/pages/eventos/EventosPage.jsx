import React, { useState } from 'react';
import FooterComponent from '../../components/footer/footerComponent';
import HeaderComponent from '../../components/header/headerComponent';
import CardEventos from '../../components/cardevento/cardEventos';
import CardAlojamiento from '../../components/cardalojamiento/cardAlojamiento';
import './EventosPage.css';

function EventosPage() {
  const [activeTab, setActiveTab] = useState('eventos'); 

  return (
    <div>
      <HeaderComponent />

      <div className="dashboard-container">
        <aside className="sidebar">
          <ul>
            <li
              className={activeTab === 'eventos' ? 'active' : ''}
              onClick={() => setActiveTab('eventos')}
            >
              Eventos
            </li>
            <li
              className={activeTab === 'alojamientos' ? 'active' : ''}
              onClick={() => setActiveTab('alojamientos')}
            >
              Alojamientos
            </li>
          </ul>
        </aside>

        <main className="content">
          {activeTab === 'eventos' ? (
            <section>
              <h2>Eventos</h2>
              <CardEventos />
            </section>
          ) : (
            <section>
              <h2>Alojamientos</h2>
              <CardAlojamiento />
            </section>
          )}
        </main>
      </div>

      <FooterComponent />
    </div>
  );
}

export default EventosPage;
