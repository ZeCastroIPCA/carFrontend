import './login.css';
import { useContext } from 'react';
import '../App.css';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { APIContext } from '../contexts/context';
import { auth, signInWithEmailAndPassword } from '../../firebase';

function Login() {
  const context = useContext(APIContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('pass');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login
      navigate('/dash');
    } catch (error) {
      // Handle login error
      console.error(error.message);
      alert('Utilizador ou palavra-passe incorretos!');
    }
  };

  return (
    <div className='login'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <form method='post' onSubmit={handleSubmit}>
        <div className='user'>
          <input id='email' name='email' type='email' className='user-input' placeholder='Utilizador' required />
        </div>
        <div className='pass'>
          <input id='pass' name='pass' type='password' className='pass-input' placeholder='Password' required />
        </div>

        <div className='forgot'>
          <p
            className='forgot-link'
            onClick={() =>
              alert('Por favor, contacte o administrador de sistemas!\nEmail: support@thewebsitebuilder.net')
            }
          >
            Esqueceu a sua palavra-passe?
          </p>
        </div>

        <div className='login-btn'>
          <button type='submit'>Iniciar sessão</button>
          <a href='/signup'>Criar conta</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
