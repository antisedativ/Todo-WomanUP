import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAMmBLyrcISs6jKclOmafBfeztUd0GYku0",
    authDomain: "womanup-test-97950.firebaseapp.com",
    projectId: "womanup-test-97950",
    storageBucket: "womanup-test-97950.appspot.com",
    messagingSenderId: "1082804654202",
    appId: "1:1082804654202:web:5e34b2edc3ec990985ebc3",
    measurementId: "G-P6N4WPE24S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get the default bucket from a custom firebase.app.App
const storage = getStorage(app);

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{storage,db}}>
    <App />
  </Context.Provider>
);
