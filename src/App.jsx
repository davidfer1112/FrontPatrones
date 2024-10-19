import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage'; 
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import EventosPage from './pages/eventos/EventosPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />
        <Route path="/eventos" element={<EventosPage />} />
      </Routes>
    </>
  );
}

export default App;