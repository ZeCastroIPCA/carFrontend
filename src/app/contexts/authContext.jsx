// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import ReactLoading from 'react-loading';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup the listener when the component unmounts
  }, []);

  if (loading) {
    return  <ReactLoading className='loading' style={loading ? {display:""} : {display:"none"}} type={"spin"} />;
  }

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error during sign out:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
