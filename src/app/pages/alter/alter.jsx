import './alter.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { APIContext } from '../../contexts/context';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useAuth } from '../../contexts/authContext';

function Alter() {
  // context
  const context = useContext(APIContext);
  // navigate hook
  const navigate = useNavigate();
  // Loading state
  const [loading, setLoading] = useState(false);

  // Param from URL (car ID)
  const id = window.location.pathname.split('/')[3];

  // Car state
  const [car, setCar] = useState({});

  useEffect(() => {
    setLoading(true);

    axios
      .get(context.api + id, context.headersCRUD)
      .then((response) => {
        setCar(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Erro ao carregar o carro!');
        navigate('/dash');
      });
  }, []);

  // alter car info
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);

    const body = {
      id: id,
      make: data.get('make'),
      model: data.get('model'),
      year: data.get('year'),
      price: data.get('price'),
    };

    axios
      .put(context.api + id, body, context.headersCRUD)
      .then((response) => {
        setLoading(false);
        alert('Informações do carro alteradas com sucesso!');
        navigate('/dash');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Erro ao editar as informações do carro!');
      });
  };

  if (loading) {
    return <ReactLoading className='loading' style={loading ? { display: '' } : { display: 'none' }} type={'spin'} />;
  }

  return (
    <div className='home'>
      <h3>Alteração das informações do carro</h3>
      <form className='sheet' onSubmit={handleUpdate}>
        <div className='car-identification'>
          <div className='make-field'>
            <h4>Marca</h4>
            <input type='text' name='make' required placeholder='Mercedes-Benz' defaultValue={car.make} />
          </div>
          <div className='model-field'>
            <h4>Modelo</h4>
            <input type='text' name='model' required placeholder='C63S' defaultValue={car.model} />
          </div>
          <div className='year-field'>
            <h4>Ano</h4>
            <input type='text' name='year' placeholder='2019' defaultValue={car.year} />
          </div>
          <div className='price-field'>
            <h4>Preço (em dólares)</h4>
            <input type='text' name='price' placeholder='79000' defaultValue={car.price} />
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

export default Alter;
