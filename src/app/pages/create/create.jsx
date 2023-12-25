import './create.css';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { APIContext } from '../../contexts/context';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import { useAuth } from '../../contexts/authContext';

function Create() {
  // context
  const context = useContext(APIContext);
  // navigate hook
  const navigate = useNavigate();
  // Loading state
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);

    const body = new FormData();

    // add all data to body
    body.append('make', data.get('make'));
    body.append('model', data.get('model'));
    body.append('year', data.get('year'));
    body.append('price', data.get('price'));

    axios
      .post(context.api, body, context.headersCRUD)
      .then((response) => {
        setLoading(false);
        alert('Carro adicionado com sucesso!');
        navigate('/dash');
      })
      .catch((error) => {
        setLoading(false);
        alert('Erro ao adicionar o carro!');
      });
  };

  // Loading animation
  if (loading) {
    return <ReactLoading className='loading' style={loading ? { display: '' } : { display: 'none' }} type={'spin'} />;
  }

  return (
    <div className='home'>
      <h3>Criação de novo carro</h3>
      <form className='sheet' onSubmit={handleCreate}>
        <div className='car-identification'>
          <div className='make-field'>
            <h4>Marca</h4>
            <input type='text' name='make' required placeholder='Mercedes-Benz' />
          </div>
          <div className='model-field'>
            <h4>Modelo</h4>
            <input type='text' name='model' required placeholder='C63S' />
          </div>
          <div className='year-field'>
            <h4>Ano</h4>
            <input type='text' name='year' placeholder='2019' />
          </div>
          <div className='price-field'>
            <h4>Preço (em dólares)</h4>
            <input type='text' name='price' placeholder='79000' />
          </div>
          <div className='button-field'>
            <button type='submit' className='save-button'>
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
