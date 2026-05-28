import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkCAXCZGzBzWinm_jBtXacIu0KLcB2uaE",
  authDomain: "eco-talk-webapp.firebaseapp.com",
  projectId: "eco-talk-webapp",
  storageBucket: "eco-talk-webapp.firebasestorage.app",
  messagingSenderId: "371889778678",
  appId: "1:371889778678:web:f0d3ac42a38f9d4a8061d7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
