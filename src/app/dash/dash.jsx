import './dash.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import Nav from '../components/nav/nav';
import Home from '../pages/home/home';
import Create from '../pages/create/create';
import Search from '../pages/search/search';
import PageNotFound from '../pages/pageNotFound/pageNotFound';
import Alter from '../pages/alter/alter';

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
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/receipts/create' element={<Create />} />
        <Route exact path='/receipts/:code' element={<Alter />} />
        <Route exact path='/receipts/' element={<Search />} />
        <Route exact path='/inventory/' element={<Search />} />
        {currentUser.photoURL === 'admin' && (
          <Route exact path='/admin' element={<h1>Admin</h1>} />
        )}
        <Route path='/404' element={<PageNotFound />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Dash;
