import { useContext } from 'react';
import './register.css';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { APIContext } from '../contexts/context';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '../../firebase';

function Register() {
  const context = useContext(APIContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('pass') === data.get('passConfirm')) {
      const name = data.get('name');
      const email = data.get('email');
      const password = data.get('pass');

      try {
        const createUser = await createUserWithEmailAndPassword(auth, email, password);
        // Handle successful register
        // Update user name
        await updateProfile(createUser.user, {
          displayName: name,
          photoURL: 'admin',
        });
        alert('Conta criada com sucesso!');
        const signIn = await signInWithEmailAndPassword(auth, email, password);
        // Handle successful login
        navigate('/dash');
      } catch (error) {
        // Handle register error
        console.error(error.message);
        alert('Não foi possível criar a conta!');
      }
    } else {
      alert('As palavras-passe não coincidem!');
    }
  };

  //password minimum requirement
  /*pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"*/

  return (
    <div className='register'>
      <div className='back-button' onClick={() => navigate('/login')}>
        <FontAwesomeIcon icon={faAngleLeft} size='3x' />
      </div>
      <form onSubmit={handleSubmit} method='post'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='description'>
          <p>Vamos criar uma conta!</p>
        </div>
        <div className='store'>
          <input type='text' name='name' className='store-input' placeholder='Nome' required />
        </div>
        <div className='email'>
          <input type='email' name='email' className='email-input' placeholder='Email' required />
        </div>
        <div className='pass1'>
          <input
            type='password'
            name='pass'
            className='pass1-input'
            placeholder='Password'
            required
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          />
        </div>
        <div className='confirm-pass'>
          <input
            type='password'
            name='passConfirm'
            className='confirm-pass-input'
            placeholder='Confirmar password'
            required
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          />
        </div>
        <label className='terms' htmlFor='terms-checkbox'>
          <input type='checkbox' name='terms-checkbox' id='terms-checkbox' required />
          <p>
            Aceito os{' '}
            <a
              href='https://darkstylepeliculas.com/politica-de-privacidade/'
              target='_blank'
              rel='noopener noreferrer'
              className='terms-link'
            >
              termos e condições
            </a>
          </p>
        </label>

        <div className='register-btn'>
          <button type='submit'>Criar conta</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
