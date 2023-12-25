import { Route, Routes } from 'react-router-dom';
import Login from './app/login/login';
import Register from './app/register/register';
import Dash from './app/dash/dash';
import ContextProvider from './app/contexts/context.jsx';
import { AuthProvider } from './app/contexts/authContext.jsx';

function MyRouter() {
  return (
    <AuthProvider>
      <ContextProvider>
        <Routes>
          <Route exact path='*' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Register />} />
          <Route exact path='/dash/*' element={<Dash />} />
        </Routes>
      </ContextProvider>
    </AuthProvider>
  );
}

export default MyRouter;
