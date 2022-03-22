import './App.css';
import FlashMessage from 'react-flash-message';
import { useState, useEffect } from "react";
import axios from "axios";
import UsersList from './Components/UsersList';
import UsersForm from './Components/UsersForm';
import back from './Components/color-verde-fluido-5369.jpeg';

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  }, []);

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };


  // ------- Hasta aquí, todo es de get y post

  const [userSelected, setUserSelected] = useState(null)
  const [status, setStatus] = useState(false);

  const deleteUser = (user) => {
    let confirmation = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmation === true) {
      axios
        .delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
        .then(() => {
          getUsers();
          setStatus(true);
          setTimeout(() => {
            setStatus(false)
          }, 1000);
        })
    }
  }

  return (
    <div className="App" >
      <div className='leftContainer' style={{ backgroundImage: `url(${back})`, backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'}}>
        <UsersList users={users} setUserSelected={setUserSelected} deleteUser={deleteUser} />
      </div>
      <div className='rightContainer'>
        <UsersForm getUsers={getUsers} userSelected={userSelected} setUserSelected={setUserSelected} />
        {status === true && (
          <FlashMessage duration={3000}>
            <strong>Usuario eliminado</strong>
          </FlashMessage>
        )}
      </div>
    </div>
  );
}

export default App;
