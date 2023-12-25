import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './itemsList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ItemsList({ linesPerPage, items }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / linesPerPage);

  const indexOfLastItem = currentPage * linesPerPage;
  const indexOfFirstItem = indexOfLastItem - linesPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='grid'>
      {items.length > 0 ? (
        currentItems.map((props) => (
          <div
            className='car'
            key={props.id}
          >
            <h1>{props.make}</h1>
            <h2>{props.model}</h2>
            <p>{props.year}</p>
            <p>{props.price}$</p>
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
