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

    const files = fileInput.current.files;
    // Check if user uploads more than 5 images
    if (files.length > 5) {
      setLoading(false);
      alert('Pode adicionar no máximo 5 fotografias!');
      context.handleRemoveImage(fileInput);
      return;
    }
    // Check if user didn't upload any photo
    if (files.length === 0) {
      setLoading(false);
      alert('Por favor envie pelo menos uma fotografia do produto!');
      return;
    }

    // add all data to body
    body.append('store', data.get('store'));
    body.append('worker', data.get('worker'));
    body.append('date', data.get('date'));
    body.append('client', data.get('client'));
    body.append('phone', data.get('phone'));
    body.append('ref', data.get('ref'));
    body.append('color', data.get('color'));
    body.append('size', data.get('size'));
    body.append('receipt', data.get('receipt'));
    body.append('useFrequency', data.get('useFrequency'));
    body.append('typeOfUse', data.get('typeOfUse'));
    body.append('numOfWashes', data.get('numOfWashes'));
    body.append('description', data.get('description'));
    // add all images to body
    for (let i = 0; i < files.length; i++) {
      body.append('images', files[i]);
    }

    axios
      .post(context.api + '/defects/create', body, context.headersFiles)
      .then((response) => {
        setLoading(false);
        alert('Defeito criado com sucesso!');
        navigate('/defeitos');
      })
      .catch((error) => {
        setLoading(false);
        alert('Erro ao criar o defeito!');
      });
  };

  // input ref for file upload
  const fileInput = useRef(null);

  const handleFileInputOpen = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className='home'>
      <ReactLoading className='loading' style={loading ? {display:""} : {display:"none"}} type={"spin"} />
      <h3>Criação de defeito</h3>
      <form className='sheet' onSubmit={handleCreate}>
        <div className='store-identification'>
          <div className='store-identification-title-rectangle'>
            <h4>Identificação da loja</h4>
          </div>
          <div className='store-name'>
            <h4>Loja</h4>
            <input
              type='text'
              name='store'
              defaultValue={localStorage.getItem('name')}
              readOnly={context.protectedRoles.includes(context.store) ? false : true}
            />
          </div>
          <div className='worker-name'>
            <h4>Colaborador</h4>
            <input type='number' name='worker' required />
          </div>
          <div className='full-date-field'>
            <h4>Data</h4>
            <input type='date' name='date' defaultValue={new Date().toISOString().substr(0, 10)} />
          </div>
        </div>
        <div className='client-identification'>
          <div className='client-identification-title-rectangle'>
            <h4>Identificação do cliente</h4>
          </div>
          <div className='client-name'>
            <h4>Nome</h4>
            <input type='text' name='client' required />
          </div>
          <div className='client-contact'>
            <h4>Contacto</h4>
            <input type='tel' name='phone' required />
          </div>
        </div>
        <div className='product-identification'>
          <div className='product-identification-title-rectangle'>
            <h4>Identificação do Artigo</h4>
          </div>
          <div className='product-reference'>
            <h4>Referência</h4>
            <input type='text' name='ref' required />
          </div>
          <div className='product-color'>
            <h4>Cor</h4>
            <input type='text' name='color' required />
          </div>
          <div className='product-size'>
            <h4>Tamanho</h4>
            <input type='text' name='size' required />
          </div>
          <div className='product-invoice'>
            <h4>Fatura</h4>
            <input type='text' name='receipt' required />
          </div>
        </div>
        <div className='photo-identification'>
          <div className='photo-identification-title-rectangle'>
            <h4>Fotografias do Artigo</h4>
          </div>
          <div className='photo-upload'>
            <label htmlFor='photos' className='photo-upload-label'>
              <h4>Adicionar fotografias</h4>
              <input
                className='photo-upload-input'
                ref={fileInput}
                type='file'
                id='photos'
                name='photos'
                accept='image/*'
                multiple
                onChange={context.handleAddImage}
              />
            </label>
            <button type='button' onClick={handleFileInputOpen}>
              <FontAwesomeIcon icon={faUpload} size='xl' />
            </button>
          </div>
        </div>
        <div className='complaint'>
          <div className='complaint-title-rectangle'>
            <h4>Reclamação Apresentada</h4>
          </div>
          <div className='use-frequence'>
            <h4>Frequência de uso</h4>
            <select name='useFrequency' id='use-frequence' required>
              <option value='Frequente'>Frequente</option>
              <option value='Ocasional'>Ocasional</option>
            </select>
          </div>
          <div className='use-type'>
            <h4>Tipo de uso</h4>
            <select name='typeOfUse' id='use-type' required>
              <option value='Trabalho'>Trabalho</option>
              <option value='Lazer'>Lazer</option>
              <option value='Desporto'>Desporto</option>
              <option value='Outro'>Outro</option>
            </select>
          </div>
          <div className='number-of-washes'>
            <h4>Nº de lavagens</h4>
            <input type='number' name='numOfWashes' required />
          </div>
          <div className='complaint-description'>
            <h4>Descrição da reclamação</h4>
            <textarea name='description' id='complaint-description' cols='30' rows='10' required></textarea>
          </div>
          <button type='submit' className='save-button'>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
