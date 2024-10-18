import { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión con:', email, password, userType);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="input-group user-type">
            <label>
              <input
                type="radio"
                name="userType"
                value="host"
                checked={userType === 'host'}
                onChange={() => setUserType('host')}
              />
              Host
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="cliente"
                checked={userType === 'cliente'}
                onChange={() => setUserType('cliente')}
              />
              Cliente
            </label>
          </div>
          <div className="input-group">
            <button type="submit" className="login-button">Iniciar Sesión</button>
          </div>
          <div className="register-link-container">
            {/* Asegúrate de que el enlace apunte a la ruta absoluta */}
            <p>¿No tienes una cuenta? <Link to="/registrarse" className="register-link">Regístrate aquí</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
