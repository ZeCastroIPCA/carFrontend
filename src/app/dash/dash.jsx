import './dash.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import Nav from '../components/nav/nav';
import Home from '../pages/home/home';
import Create from '../pages/create/create';
import Alter from '../pages/alter/alter';
import PageNotFound from '../pages/pageNotFound/pageNotFound';

function Dash() {
  // navigate hook
  const navigate = useNavigate();
  // auth context
  const { currentUser } = useAuth();
  //check if user is logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser]);

  return (
    <div className='dash'>
      <Nav userName={currentUser && currentUser.displayName} />
      {currentUser && (
        <Routes>
          <Route exact path='/' element={<Home />} />
          {currentUser.photoURL === 'admin' && <Route path='/adicionar' element={<Create />} />}
          {currentUser.photoURL === 'admin' && <Route path='/alterar/:id' element={<Alter />} />}
          <Route path='/404' element={<PageNotFound />} />
          <Route exact path='*' element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default Dash;
