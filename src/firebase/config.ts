import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBnapg3h-FPd4JvXem6837mGUp4H-4cM_g",
  authDomain: "landings-d1cb5.firebaseapp.com",
  projectId: "landings-d1cb5",
  storageBucket: "landings-d1cb5.appspot.com",
  messagingSenderId: "979990614011",
  appId: "1:979990614011:web:4609dd3844f3d3488fc55e"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;