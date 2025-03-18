import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm1nWqpXzxLgzguOEAUip4yx-K9_Lfzzs",
  authDomain: "miniblog-6b9d8.firebaseapp.com",
  projectId: "miniblog-6b9d8",
  storageBucket: "miniblog-6b9d8.firebasestorage.app",
  messagingSenderId: "1046211738051",
  appId: "1:1046211738051:web:2944a6cd89aa99ba87a576"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };