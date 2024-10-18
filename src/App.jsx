import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage'; 
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;