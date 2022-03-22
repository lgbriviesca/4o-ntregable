import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import FlashMessage from 'react-flash-message';


const UsersForm = ({ getUsers, userSelected, setUserSelected }) => {

  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [birthday, setBirthday] = useState("")

  const [status, setStatus] = useState(false);
  const [statusCreated, setStatusCreated] = useState(false);

  const submit = (e) => {
    e.preventDefault(); //se le pone el default para que no recargue la página
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      birthday: birthday,
    }; //esto pertenece al put
    if (userSelected) {
      console.log("Sí se está actualizando");
      let confirmation = window.confirm('¿Estás seguro de que quieres modificar este usuario?')
      if (confirmation === true) {
        axios
          .put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
          .then(() => {
            getUsers();
            setUserSelected(null);
            reset();
            setStatus(true);
            setTimeout(() => {
              setStatus(false)
            }, 1000);
          })
      }; //esto pertenece al put  
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", user)
        .then(() => {
          getUsers();
          setFirst_name("");
          setLast_name("");
          setEmail("");
          setPassword("");
          setBirthday("");
          setStatusCreated(true);
          setTimeout(() => {
            setStatusCreated(false)
          }, 1000);
        })
        .catch((error) => console.log(error.response));
    }
  };

  // ------- Hasta aquí, todo es de get y post

  useEffect(() => {
    if (userSelected) {
      setFirst_name(userSelected.first_name);
      setLast_name(userSelected.last_name);
      setEmail(userSelected.email);
      setPassword(userSelected.password);
      setBirthday(userSelected.birthday);
    }
  }, [userSelected]);

  const reset = () => {
    setUserSelected(null);
    setFirst_name("");
    setLast_name("");
    setEmail("");
    setPassword("");
    setBirthday("");
  };

  return (
    <form onSubmit={submit}>
      <p className='new-user'>New User</p>
      <div className='form_nameAndLastName'>
        <div className='icons'><i className="fa-solid fa-user"></i></div>
        <div className="input-container">
          <label htmlFor="first_name"></label>
          <input
          className='input1'
          placeholder="first name"
            type="text"
            onChange={(e) => setFirst_name(e.target.value)}
            value={first_name}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="last_name"></label>
          <input
           className='input2'
           placeholder="last name"
            type="text"
            onChange={(e) => setLast_name(e.target.value)}
            value={last_name}
            required
          />
        </div>
      </div>

      <div className='form_email'>
        <div className='icons'>
          <i className="fa-solid fa-envelope"></i>
        </div>
        <div className="input-container">
          <label htmlFor="email" ></label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            value={email}
            required
          />
        </div>
      </div>

      <div className='form_password'>
        <div className='icons'>
          <i className="fa-solid fa-lock"></i>
        </div>
        <div className="input-container">
          <label htmlFor="password"></label>
          <input
              placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
      </div>
      <div className='form_birthday'>
        <div className='icons'>
          <i className="fa-solid fa-cake-candles"></i>
        </div>
        <div className="input-container">
          <label htmlFor="birthday"></label>
          <input
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            required
          />
        </div>
      </div>
      <button className='submit'>Send</button>
      <div className='flash'>
      {status === true && (
        <FlashMessage duration={3000}>
          <strong>Usuario actualizado</strong>
        </FlashMessage>
      )}
         {statusCreated === true && (
        <FlashMessage duration={3000}>
          <strong>Usuario apregado</strong>
        </FlashMessage>
      )}
      </div>
   
    </form>
  );
};

export default UsersForm;