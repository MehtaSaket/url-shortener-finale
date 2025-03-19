import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { db } from '../utils/firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore"; 

function GoLink() {
  const { code } = useParams();
  const navigate = useNavigate(); 
  const [url, setUrl] = useState('');

  useEffect(() => {
    const q = query(collection(db, "urls"), where("code", "==", code));
    
    const unsubscribe = onSnapshot(q, (data) => {
      if (data.empty) {
        console.log("url not found")
        navigate("/"); 
        return;
      }
      console.log(data);
      let finalData = data.docs[0].data();
      setUrl(finalData.url); 
      window.location.replace(finalData.url); 
    });

    return () => unsubscribe();
  }, [code, navigate]); 

  return (
    <div>
    </div>
  );
}

export default GoLink;
