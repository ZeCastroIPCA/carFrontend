import './nav.css';
import logo from '../../../assets/images/logo.webp';
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
  }

  return (
    <nav className='nav'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <div className='links'>
        <a href='/dash' style={tab === '/dash' ? { backgroundColor: 'var(--main-color)', color: 'white' } : {}}>
          Inicio
        </a>
        <a
          href='/dash/receipts'
          style={tab === '/dash/receipts' ? { backgroundColor: 'var(--main-color)', color: 'white' } : {}}
        >
          Faturas
        </a>
        <a
          href='/dash/inventory'
          style={tab === '/dash/inventory' ? { backgroundColor: 'var(--main-color)', color: 'white' } : {}}
        >
          Inventário
        </a>
        {currentUser.photoURL === 'admin' && (<a
          href='/dash/admin'
          id='adminTab'
          style={tab === '/dash/admin' ? { backgroundColor: 'var(--secundary-color)', color: 'white' } : {}}
        >
          Admin
        </a>)}
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
