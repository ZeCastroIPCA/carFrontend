import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './itemsList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { APIContext } from '../../contexts/context';
import { useAuth } from '../../contexts/authContext';

function ItemsList({ linesPerPage, items }) {
  // navigate hook
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / linesPerPage);

  const indexOfLastItem = currentPage * linesPerPage;
  const indexOfFirstItem = indexOfLastItem - linesPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // context
  const context = useContext(APIContext);
  // Loading state
  const [loading, setLoading] = useState(false);

  // auth context
  const { currentUser } = useAuth();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // delete car
  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(context.api + id, context.headersCRUD)
      .then((response) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Erro ao apagar o carro!');
        window.location.reload();
      });
  };

  if (loading) {
    return <ReactLoading className='loading' style={loading ? { display: '' } : { display: 'none' }} type={'spin'} />;
  }

  return (
    <div className='grid'>
      {items.length > 0 ? (
        currentItems.map((props) => (
          <div className='car' key={props.id}>
            <h1 className='props-text'>{props.make}</h1>
            <h2 className='props-text'>{props.model}</h2>
            <p className='props-text'>{props.year}</p>
            <p className='props-text'>{props.price}$</p>
            {currentUser && currentUser.photoURL === 'admin' && (
              <button className='trash-btn' onClick={() => handleDelete(props.id)}>
                <FontAwesomeIcon icon={faTrash} size='1x' />
              </button>
            )}
            {currentUser && currentUser.photoURL === 'admin' && (
              <button className='alter-btn' onClick={() => navigate('/dash/alterar/' + props.id)}>
                <FontAwesomeIcon icon={faEdit} size='1x' />
              </button>
            )}
          </div>
        ))
      ) : (
        <div className='empty-line'>
          <p>Não existem carros de exposição no momento</p>
        </div>
      )}
      {items.length > 0 && (
        <div className='items-button-box'>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <FontAwesomeIcon icon={faArrowLeft} size='1x' color='black' />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <FontAwesomeIcon icon={faArrowRight} size='1x' color='black' />
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemsList;
