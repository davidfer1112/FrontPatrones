import { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'; // Importar js-cookie
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password, role: userType };

    try {
      await loginUser(credentials);

      // Guardar el correo en una cookie
      Cookies.set('correo', email, { expires: 1 }); // La cookie expirará en 1 día

      // Mostrar mensaje de éxito
      toast.success('Inicio de sesión exitoso!', {
        duration: 2000,
        position: 'top-center',
        iconTheme: {
          primary: '#4CAF50',
          secondary: '#fff',
        },
      });

      // Redirigir después de iniciar sesión
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="login-container">
      <Toaster />
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
                value="admin"
                checked={userType === 'admin'}
                onChange={() => setUserType('admin')}
              />
              Admin
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
            <p>¿No tienes una cuenta? <Link to="/registrarse" className="register-link">Regístrate aquí</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
