import { createContext } from 'react';

export const APIContext = createContext();
const ContextProvider = (props) => {
  const api = 'http://localhost:3001';
  //const api = "https://fuxiadefeitosbackend-production.up.railway.app"
  const headersCRUD = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  const headersFiles = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  const role = '';
  const store = localStorage.getItem('name');
  const protectedRoles = ['Administrador', 'Coordenador'];

  // add images in file input in create and alter pages
  const handleAddImage = (e) => {
    const files = e.target.files;
    const images = document.querySelector('.photo-upload-label');
    images.style.justifyContent = 'flex-start';
    files.length > 0 && images.querySelector('h4') && images.querySelector('h4').remove();
    for (let i = 0; i < files.length; i++) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(files[i]);
      img.style.height = '100px';
      img.style.objectFit = 'cover';
      img.style.marginLeft = '1rem';
      img.style.borderRadius = '10px';
      images.appendChild(img);
    }
  };

  // remove images in file input in create and alter pages
  const handleRemoveImage = (fileInput) => {
    const images = document.querySelector('.photo-upload-label');
    images.style.justifyContent = 'center';
    //images.innerHTML = '';
    const h4 = document.createElement('h4');
    h4.innerHTML = 'Adicionar fotografias';
    images.appendChild(h4);
    const img = images.querySelectorAll('.photo-upload-label img');
    img.forEach((img) => img.remove());
    fileInput.current.value = '';
  };

  // upload photos in create and alter pages
  const handleUploadPhotos = async (e) => {
    const files = e.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }
    const response = await fetch(`${api}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <APIContext.Provider
      value={{
        api,
        role,
        headersCRUD,
        headersFiles,
        store,
        protectedRoles,
        handleAddImage,
        handleRemoveImage,
        handleUploadPhotos,
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
export default ContextProvider;