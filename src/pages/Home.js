import React, { useState, useEffect } from 'react';
import { db, auth, signOut } from '../utils/firebase'; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import '../CSS/Home.css';

function generateShortCode(length = 6) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [user, setUser] = useState(null);
  const [userUrls, setUserUrls] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("You must be logged in to shorten URLs.");
      return;
    }
    try {
      const code = generateShortCode();
      await addDoc(collection(db, "urls"), { url, code, userId: user.uid });
      setShortUrl(`http://localhost:3000/l/${code}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchUserUrls = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "urls"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setUserUrls(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching user URLs: ", error);
    }
  };

  return (
    <div className="home-background">
      <div className="glass-container">
        <h1>URL Shortener</h1>
        <form onSubmit={handleFormSubmit} className="input-form">
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter URL..." 
          />
          <button type="submit">Shorten</button>
        </form>

        {shortUrl && (
          <div className="short-url">
            <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          </div>
        )}

        {user && (
          <div className="user-section">
            <p>Logged in as: {user.displayName}</p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <button onClick={fetchUserUrls} className="fetch-btn">My URLs</button>
            {userUrls.length > 0 && (
              <div className="user-urls">
                <h3>Your Past URLs:</h3>
                <ul>
                  {userUrls.map((item) => (
                    <li key={item.id}>
                      <p>Original: {item.url}</p>
                      <a href={`http://localhost:3000/l/${item.code}`} target="_blank" rel="noopener noreferrer">{item.code}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;