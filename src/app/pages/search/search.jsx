import './search.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faFilter, faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { APIContext } from '../../contexts/context';
import { useAuth } from '../../contexts/authContext';
import ItemsList from '../../components/itemsList/itemsList';

function Filters({ close, apply }) {
  // context
  const context = useContext(APIContext);
  return (
    <div className='filters-background'>
      <div className='filters-blocker' onClick={close}></div>
      <div className='filters'>
        <h3>Filtros</h3>
        <button className='close-button' onClick={close}>
          <FontAwesomeIcon icon={faX} size='1x' color='white' />
        </button>
        <div className='fields'>
          <div className='phone-field'>
            <h4>Contacto</h4>
            <input type='tel' placeholder='Contacto do cliente' />
          </div>
          <div className='date-field'>
            <h4>Data</h4>
            <input type='date' />
          </div>
          <div className='worker-field'>
            <h4>Colaborador</h4>
            <select name='worker' id='worker' defaultValue=''>
              <option value=''>
                Escolha o colaborador
              </option>
              <option value='652'>Lara Correia</option>
              <option value='648'>José Castro</option>
              <option value='646'>João Pereira</option>
            </select>
          </div>
          <div className='status-field'>
            <h4>Estado</h4>
            <select name='status' id='status' defaultValue=''>
              <option value=''>
                Escolha o estado
              </option>
              <option value='Em Análise'>Em análise</option>
              <option value='Aguarda Levantamento'>Aguarda levantamento</option>
              <option value='Resolvido'>Resolvido</option>
            </select>
          </div>
          { context.protectedRoles.includes(context.store) && <div className='store-field'>
            <h4>Loja</h4>
            <select name='status' id='status' defaultValue=''>
              <option value=''>
                Escolha a loja
              </option>
              <option value='Braga Parque'>Braga Parque</option>
              <option value='Norte Shopping'>Norte Shopping</option>
            </select>
          </div>}
        </div>
        <div className='button-div'>
          <button className='apply-button' onClick={apply}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

function Search() {
  // context
  const context = useContext(APIContext);
  // navigate hook
  const navigate = useNavigate();
  // Loading state
  const [loading, setLoading] = useState(false);
  // jobs state
  const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(context.api + '/defects/getAll/' + context.store, context.headersCRUD)
  //     .then((response) => {
  //       // Reverse the order of the array
  //       const reversedDefects = response.data.reverse();
  //       console.log('All defects:', reversedDefects);

  //       setJobs(reversedDefects);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //       alert('Erro ao carregar os defeitos!');
  //       window.location.reload();
  //     });
  // }, []);

  // Filter popup
  const [filters, setFilters] = useState(false);

  const handleOpenFilters = () => {
    setFilters(true);
  };

  const handleCloseFilters = () => {
    setFilters(false);
  };

  // Search defects
  const handleSearch = (id) => {

    setLoading(true);
    let callString = '';
    if (id === '') {
      callString = '/defects/getByStore/' + context.store;
    } else {
      callString = '/defects/getByCode/' + context.store + '/' + id;
    }

    axios
      .get(context.api + callString, context.headersCRUD)
      .then((response) => {
        setLoading(false);
        console.log('Defect:', response.data);

        if (response.data.length === 0) {
          alert('Não existe nenhum defeito com esse ID!');
        } else {
          let reversedDefects = response.data.reverse();
          setJobs(reversedDefects);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert('Erro ao carregar o defeito!');
        window.location.reload();
      });
  };

  // Code input value
  const [searchValue, setSearchValue] = useState('');

  // Apply filters
  const handleApplyFilters = () => {
    setLoading(true);
    // Get all the fields
    const phone = document.querySelector('.phone-field input').value;
    const date = document.querySelector('.date-field input').value;
    const worker = document.querySelector('.worker-field select').value;
    const state = document.querySelector('.status-field select').value;
    const store = context.protectedRoles.includes(context.store) ? document.querySelector('.store-field select').value : context.store;

    // Create the body
    const body = {
      phone: phone,
      date: date,
      worker: parseInt(worker),
      state: state,
      store: store,
    };

    axios
      .post(context.api + '/defects/getByFilters', body, context.headersCRUD)
      .then((response) => {
        setLoading(false);
        console.log('Defects:', response.data);
        if (response.data.length === 0) {
          alert('Não existe nenhum defeito com esses filtros!');
        } else {
          let reversedDefects = response.data.reverse();
          setJobs(reversedDefects);
          // Close the filters popup
          handleCloseFilters();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert('Erro ao carregar os defeitos!');
        window.location.reload();
      });
  };

  if (loading) {
    return <ReactLoading className='loading' style={loading ? { display: '' } : { display: 'none' }} type={'spin'} />;
  }

  return (
    <div className='home'>
      {filters && <Filters close={handleCloseFilters} apply={handleApplyFilters} />}
      <div className='nav-bar'>
        <div className='search'>
          <input
            type='text'
            placeholder='Código do defeito'
            id='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDownCapture={(e) => {
              e.key === 'Enter' && handleSearch(e.target.value);
            }}
          />
          <button>
            <FontAwesomeIcon icon={faSearch} size='1x' color='white' onClick={() => handleSearch(searchValue)} />
          </button>
        </div>
        <button className='filter' onClick={handleOpenFilters}>
          <FontAwesomeIcon icon={faFilter} size='1x' color='white' />
        </button>
      </div>
      <div className='table'>
        <div className='headings'>
          <p>ID</p>
          <p>Data</p>
          <p>Cliente</p>
          <p>Colab.</p>
          <p>Estado</p>
        </div>
        <ItemsList linesPerPage={5} items={jobs} />
      </div>
    </div>
  );
}

export default Search;
