import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage'; 
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import EventosPage from './pages/eventos/EventosPage';
import EventDetailsPage from './pages/eventDetail/EventDetailPage';
import PerfilAdminPage from './pages/perfilAdmin/PerfilAdminPage';
import PerfilClientePage from './pages/perfilCliente/PerfilClientePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/eventos/:id" element={<EventDetailsPage />} />
        <Route path="/perfil-admin" element={<PerfilAdminPage />} />
        <Route path="/perfil-cliente" element={<PerfilClientePage />} />
      </Routes>
    </>
  );
}

export default App;