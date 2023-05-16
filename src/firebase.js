import {initializeApp}from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDBvAgMUjFwX20LDdnuSIa1V9vZyEFps-k",
  authDomain: "todo-crud-b.firebaseapp.com",
  projectId: "todo-crud-b",
  storageBucket: "todo-crud-b.appspot.com",
  messagingSenderId: "10688826519",
  appId: "1:10688826519:web:7ffd4aa0d0e31a066aadd2"
};
  const app=initializeApp(firebaseConfig);
  const db=getFirestore(app);

  export {db}; 