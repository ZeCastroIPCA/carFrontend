import { createContext } from 'react';

export const APIContext = createContext();
const ContextProvider = (props) => {
  const api = 'http://localhost:5213/api/cars/';
  //const api = "https://fuxiadefeitosbackend-production.up.railway.app"
  const headersCRUD = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (
    <APIContext.Provider
      value={{
        api,
        headersCRUD,
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
export default ContextProvider;