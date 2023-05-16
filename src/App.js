import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';
import Title from "./components/Title";
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import{
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import googleIcon from './components/google.png'
import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      setUser(user);
      } else {
      setUser(null);
      }
      });
      }, []);
      
      const handleEdit = async (todo, title) => {
      await updateDoc(doc(db, "todos", todo.id), { title: title });
      };
      
      const toggleComplete = async (todo) => {
      await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
      });
      };
      
      const handleDelete = async (id) => {
      await deleteDoc(doc(db, "todos", id));
      };
      
      return (
      <div className="App">
      {user ? (
      <>
      <div>
      <Title />
      </div>
      <div>
      <AddTodo />
      </div>
      <div className="todo_container">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
      <button className="logout_button" onClick={() => setUser(null)}>ÇIKIŞ</button>

    </>
  ) : (
    <div className="login_container">
    <button className="google_button" onClick={() => {
      const auth = getAuth();
      const provider = new firebase.auth.GoogleAuthProvider();
      signInWithPopup(auth, provider);
    }}>
      <img className="google_icon" src={googleIcon} alt="Google Logo" />
      <span className="button_text">Google İle Giriş Yap</span>
    </button>
  </div>
  )}
</div>
);
}

export default App;