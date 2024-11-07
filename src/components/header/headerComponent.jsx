import logo from '../../assets/logo.png';
import usericon from '../../assets/user.svg';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function HeaderComponent() {
  const isAuthenticated = !!Cookies.get('token');
  const navigate = useNavigate();

  // Manejar el click en "Explorar" y verificar autenticación
  const handleExploreClick = () => {
    if (isAuthenticated) {
      navigate('/eventos');
    } else {
      navigate('/iniciar-sesion');
    }
  };

  // Manejar el click en el ícono de usuario y redirigir según el rol
  const handleUserIconClick = () => {
    const role = Cookies.get('rol');
    if (role === 'admin') {
      navigate('/perfil-admin');
    } else if (role === 'cliente') {
      navigate('/perfil-cliente');
    } else {
      navigate('/iniciar-sesion'); // En caso de que el rol no esté definido o no esté autenticado
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className='logo'>
          <Link to="/">
            <img src={logo} alt="Logo de UNLOCK" className="logo-image"/>
          </Link>
          <h1 className="title">UNLOCK</h1>
        </div>
        <div className="search-container">
          <button className="button" onClick={handleExploreClick}>
            <svg className="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
            </svg>
            Explorar
          </button>
        </div>
        <nav className="nav">
          {isAuthenticated ? (
            <button onClick={handleUserIconClick} className="user-icon-button">
              <img src={usericon} alt="Usuario" className="user-icon" />
            </button>
          ) : (
            <button className='btn'>
              <Link className="nav-link" to="/iniciar-sesion">Iniciar Sesión</Link>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default HeaderComponent;
