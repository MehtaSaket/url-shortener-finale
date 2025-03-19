import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAnu-Hu5wNkV9tyNtq3UBQTyKPwaknIOIU",
  authDomain: "url-shortener-19533.firebaseapp.com",
  projectId: "url-shortener-19533",
  storageBucket: "url-shortener-19533.firebasestorage.app",
  messagingSenderId: "978906671117",
  appId: "1:978906671117:web:1d9a5ddac862507790cd44",
  measurementId: "G-Y0T7C46FSV"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const db = getFirestore(app);


export { auth, googleProvider, signInWithPopup, signOut, db, setDoc, doc }; // Export setDoc and doc
