import './nav.css';
import logo from '../../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

function Nav({ userName }) {
  // check current tab
  let tab = window.location.pathname;

  // navigate hook
  const navigate = useNavigate();

  // auth context
  const { currentUser } = useAuth();

  //logout
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className='nav'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <div className='links'>
        <a href='/dash' style={tab === '/dash' ? { backgroundColor: 'var(--main-color)', color: 'white' } : {}}>
          Carros
        </a>
        {currentUser && currentUser.photoURL === 'admin' && (
          <a
            href='/dash/adicionar'
            style={tab === '/dash/adicionar' ? { backgroundColor: 'var(--main-color)', color: 'white' } : {}}
          >
            Adicionar
          </a>
        )}
      </div>
      <div className='footer'>
        <p>{userName}</p>
        <button
          onClick={() => {
            handleLogout();
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Nav;
