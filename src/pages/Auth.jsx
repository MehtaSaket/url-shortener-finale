
import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, db, setDoc, doc } from '../utils/firebase'; 
import '../CSS/Auth.css';

function Auth() {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

    
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

     
      setUser(user);
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);  
    } catch (error) {
      console.error("Error during Sign-Out:", error.message);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}!</h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="Profile" width="100" height="100" />
          <br />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default Auth;
