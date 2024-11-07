import { useState } from 'react';
import { registerUser } from '../../services/authService'; // Servicio actualizado para registrar usuarios
import { toast, Toaster } from 'react-hot-toast'; // Importa la librería de toasts
import { useNavigate } from 'react-router-dom'; // Para redirigir al inicio de sesión
import './RegisterPage.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('cliente'); // Por defecto, cliente

  const navigate = useNavigate(); // Hook para navegar a otra página

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
      phone: telephone, // Cambiado a `phone` para coincidir con el backend
      address,
      is_active: true,   // Aseguramos que el usuario está activo por defecto
    };

    try {
      const response = await registerUser(userData);
      
      if (response) {
        // Si la respuesta es exitosa, muestra el toast de éxito
        toast.success('Usuario registrado con éxito!', {
          duration: 2000,
          position: 'top-center',
          iconTheme: {
            primary: '#4CAF50',
            secondary: '#fff',
          },
        });

        // Redirige a la página de inicio de sesión después de un retraso (2 segundos para que se vea el toast)
        setTimeout(() => {
          navigate('/iniciar-sesion');
        }, 2000);
      }
    } catch (error) {
      toast.error('Error al registrar el usuario', {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="register-container">
      <Toaster /> {/* Añade el componente Toaster para que los toasts se muestren */}
      <div className="register-card">
        <h2 className="register-title">Regístrate</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="telephone">Teléfono</label>
            <input
              type="tel"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Tu número de teléfono"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Tu dirección"
              required
            />
          </div>
          <div className="input-group user-type">
            <label>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="cliente"
                checked={role === 'cliente'}
                onChange={() => setRole('cliente')}
              />
              Cliente
            </label>
          </div>
          <div className="input-group">
            <button type="submit" className="register-button">Regístrate</button>
          </div>
        </form>
      </div>
    </div>
  );
}
