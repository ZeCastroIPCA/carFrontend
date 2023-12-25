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

  //translate date to readable format
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

  return (
    <div className='items-table'>
      {items.length > 0 ? (
        currentItems.map((props) => (
          <div
            className='content-line'
            key={props._id}
            onClick={() => {
              if (window.location.pathname.split('/')[2] == 'consultar') {
                navigate('/defeitos/consultar/' + props._id);
              } else {
                navigate('consultar/' + props._id);
              }
            }}
          >
            <p>{props.id}</p>
            <p>{formatDate(props.date)}</p>
            <p>{props.client}</p>
            <p>{props.worker}</p>
            <p>{props.state}</p>
          </div>
        ))
      ) : (
        <div className='empty-line'>
          <p>Não existem items</p>
        </div>
      )}
      {items.lenght > 0 && (
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
