import { createContext } from 'react';

export const APIContext = createContext();
const ContextProvider = (props) => {
  const api = 'http://localhost:5213/api/cars/';
  //const api = "https://fuxiadefeitosbackend-production.up.railway.app"
  const exchangeApiKey = "fca_live_vtIHfJaCOjgkHCVXlWdVeGWL7KA4E2bVKIHAk671";
  const exchangeApi = "https://api.freecurrencyapi.com/v1/latest?apikey=" + exchangeApiKey + "&currencies=EUR&base_currency=USD";
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
        exchangeApi
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
export default ContextProvider;