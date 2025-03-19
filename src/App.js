import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.js';
import GoLink from './components/GoLink.js';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from './pages/Auth.jsx';

function App() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const auth = getAuth();
    
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setUser(user);
      } else {
        
        setUser(null);
      }
      setLoading(false); 
    });

    
    return () => unsubscribe();
  }, []);
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/l/:code" element={ <GoLink />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
