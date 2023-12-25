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

  // Defects state
  const [defects, setDefects] = useState([]);

  // const headersCRUD = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + localStorage.getItem('token'),
  //   },
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(context.api + '/defects/getAll/' + localStorage.getItem("name") , headersCRUD)
  //     .then((response) => {
  //       // Reverse the order of the array
  //       const reversedDefects = response.data.reverse();
  //       console.log('All defects:', reversedDefects);

  //       setDefects(reversedDefects);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //       alert('Erro ao carregar os defeitos!');
  //       window.location.reload();
  //     });
  // }, []);

  if (loading) {
    return <ReactLoading className='loading' style={loading ? { display: '' } : { display: 'none' }} type={'spin'} />;
  }

  return (
    <div className='home'>
      <h3>Em progresso</h3>
      <div className='table'>
        <div className='headings'>
          <p>ID</p>
          <p>Data</p>
          <p>Cliente</p>
          <p>Colab.</p>
          <p>Estado</p>
        </div>
        <ItemsList linesPerPage={5} items={defects} />
      </div>
      <h3>Alerta de stock</h3>
      <div className='table'>
        <div className='headings-stock'>
          <p>Produto</p>
          <p>Quantidade</p>
        </div>
        <ItemsList linesPerPage={5} items={defects} />
      </div>
    </div>
  );
}

export default Home;
