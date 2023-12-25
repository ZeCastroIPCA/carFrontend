import './home.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { APIContext } from '../../contexts/context';
import ItemsList from '../../components/itemsList/itemsList';

function Home() {
  // context
  const context = useContext(APIContext);
  // navigate hook
  const navigate = useNavigate();
  // Loading state
  const [loading, setLoading] = useState(false);
  // Cars state
  const [cars, setCars] = useState([]);

  const headersCRUD = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(context.api, headersCRUD)
      .then((response) => {
        console.log('Cars:', response.data);

        setCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Erro ao carregar os carros!');
        window.location.reload();
      });
  }, []);

  if (loading) {
    return <ReactLoading className='loading' style={loading ? { display: '' } : { display: 'none' }} type={'spin'} />;
  }

  return (
    <div className='home'>
      <h3>Carros em exposição</h3>
      <ItemsList linesPerPage={3} items={cars} />
    </div>
  );
}

export default Home;
