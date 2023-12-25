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

  // Param from URL (defect ID)
  const id = window.location.pathname.split('/')[3];

  // Defect state
  const [defect, setDefect] = useState({});

  // Photos state
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(context.api + '/defects/getById/' + id, context.headersCRUD)
      .then((response) => {
        console.log('Defect ' + response.data.id + ':', response.data);
        setDefect(response.data);
        setPhotos(response.data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Erro ao carregar o defeito!');
        navigate('/defeitos');
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const body = {
      state: defect.state,
      store: data.get('store'),
      worker: data.get('worker'),
      date: data.get('date'),
      client: data.get('client'),
      phone: data.get('phone'),
      ref: data.get('ref'),
      color: data.get('color'),
      size: data.get('size'),
      receipt: data.get('receipt'),
      useFrequency: data.get('useFrequency'),
      typeOfUse: data.get('typeOfUse'),
      numOfWashes: data.get('numOfWashes'),
      description: data.get('description'),
    };

    console.log(body);

    axios
      .put(context.api + '/defects/update/' + id, body, context.headersCRUD)
      .then((response) => {
        setLoading(false);
        alert('Defeito alterado com sucesso!');
        navigate('/defeitos');
      })
      .catch((error) => {
        setLoading(false);
        alert('Erro ao alterar o defeito!');
      });
  };

  return (
    <div className='home'>
      <ReactLoading className='loading' style={loading ? {display:""} : {display:"none"}} type={"spin"} />
      <h3>Alteração de defeito</h3>
      <form className='sheet' onSubmit={handleUpdate}>
        <div className='product-status'>
          <div className='product-status-title-rectangle'>
            <h4>Estado do defeito</h4>
          </div>
          <div className='status-buttons'>
            <label
              htmlFor='Em Análise'
              className={defect.state != 'Em Análise' ? 'status-button not-selected' : 'status-button btn-red'}
            >
              <input
                type='radio'
                id='Em Análise'
                checked={defect.state == 'Em Análise'}
                onChange={() => setDefect({ ...defect, state: 'Em Análise' })}
                disabled={
                  context.protectedRoles.includes(localStorage.getItem('name'))
                    ? false
                    : defect.state == 'Resolvido' || defect.state == 'Aguarda Levantamento'
                    ? true
                    : false
                }
              />
              Em Análise
            </label>
            <label
              htmlFor='Aguarda Levantamento'
              className={
                defect.state != 'Aguarda Levantamento' ? 'status-button not-selected' : 'status-button btn-yellow'
              }
            >
              <input
                type='radio'
                id='Aguarda Levantamento'
                checked={defect.state == 'Aguarda Levantamento'}
                onChange={() => setDefect({ ...defect, state: 'Aguarda Levantamento' })}
                disabled={
                  context.protectedRoles.includes(localStorage.getItem('name'))
                    ? false
                    : defect.state == 'Resolvido'
                    ? true
                    : false
                }
              />
              Aguarda Levantamento
            </label>
            <label
              htmlFor='Resolvido'
              className={defect.state != 'Resolvido' ? 'status-button not-selected' : 'status-button btn-green'}
            >
              <input
                type='radio'
                id='Resolvido'
                checked={defect.state == 'Resolvido'}
                onChange={() => setDefect({ ...defect, state: 'Resolvido' })}
              />
              Resolvido
            </label>
          </div>
        </div>
        <div className='store-identification'>
          <div className='store-identification-title-rectangle'>
            <h4>Identificação da loja</h4>
          </div>
          <div className='store-name'>
            <h4>Loja</h4>
            <input
              type='text'
              name='store'
              defaultValue={defect.store}
              readOnly={context.protectedRoles.includes(context.store) ? false : true}
            />
          </div>
          <div className='worker-name'>
            <h4>Colaborador</h4>
            <input type='number' name='worker' defaultValue={defect.worker} readOnly={true} />
          </div>
          <div className='full-date-field'>
            <h4>Data</h4>
            <input type='date' name='date' value={defect.date ? defect.date.split('T')[0] : ''} readOnly={true} />
          </div>
        </div>
        <div className='client-identification'>
          <div className='client-identification-title-rectangle'>
            <h4>Identificação do cliente</h4>
          </div>
          <div className='client-name'>
            <h4>Nome</h4>
            <input type='text' name='client' defaultValue={defect.client} />
          </div>
          <div className='client-contact'>
            <h4>Contacto</h4>
            <input type='tel' name='phone' defaultValue={defect.phone} />
          </div>
        </div>
        <div className='product-identification'>
          <div className='product-identification-title-rectangle'>
            <h4>Identificação do Artigo</h4>
          </div>
          <div className='product-reference'>
            <h4>Referência</h4>
            <input type='text' name='ref' defaultValue={defect.ref} />
          </div>
          <div className='product-color'>
            <h4>Cor</h4>
            <input type='text' name='color' defaultValue={defect.color} />
          </div>
          <div className='product-size'>
            <h4>Tamanho</h4>
            <input type='text' name='size' defaultValue={defect.size} />
          </div>
          <div className='product-invoice'>
            <h4>Fatura</h4>
            <input type='text' name='receipt' defaultValue={defect.receipt} />
          </div>
        </div>
        <div className='photo-identification'>
          <div className='photo-identification-title-rectangle'>
            <h4>Fotografias do Artigo</h4>
          </div>
          <div className={photos.length === 0 ? 'photo-upload-alter' : 'photo-upload'}>
            {photos.length > 0 ? photos.map((photo) => (
              <a key={photo} href={photo} target="_blank">
                <img src={photo} alt='product-photo' />
              </a>
            )) : <h4>Não existem fotografias para este defeito!</h4>}
          </div>
        </div>
        <div className='complaint'>
          <div className='complaint-title-rectangle'>
            <h4>Reclamação Apresentada</h4>
          </div>
          <div className='use-frequence'>
            <h4>Frequência de uso</h4>
            <select
              name='useFrequency'
              id='use-frequence'
              value={defect.useFrequency}
              onChange={(e) => (e.currentTarget.value = setDefect({ ...defect, useFrequency: e.currentTarget.value }))}
            >
              <option value='Frequente'>Frequente</option>
              <option value='Ocasional'>Ocasional</option>
            </select>
          </div>
          <div className='use-type'>
            <h4>Tipo de uso</h4>
            <select
              name='typeOfUse'
              id='use-type'
              value={defect.typeOfUse}
              onChange={(e) => (e.currentTarget.value = setDefect({ ...defect, typeOfUse: e.currentTarget.value }))}
            >
              <option value='Trabalho'>Trabalho</option>
              <option value='Lazer'>Lazer</option>
              <option value='Desporto'>Desporto</option>
              <option value='Outro'>Outro</option>
            </select>
          </div>
          <div className='number-of-washes'>
            <h4>Nº de lavagens</h4>
            <input type='number' name='numOfWashes' defaultValue={defect.numOfWashes} />
          </div>
          <div className='complaint-description'>
            <h4>Descrição da reclamação</h4>
            <textarea
              id='complaint-description'
              cols='30'
              rows='10'
              name='description'
              defaultValue={defect.description}
            ></textarea>
          </div>
          <button className='save-button' type='submit'>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Alter;
