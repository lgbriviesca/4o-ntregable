import React from 'react';


const UsersList = ({ users, setUserSelected, deleteUser }) => {

  return (
    <div>
      {
        users.map(user => (
          <div className='wrap' key={user.id}>
            <li className='list'>
              <div className='name'>
                <p>{user.first_name} {user.last_name} </p>
              </div>
              <p className='email'>
                {user.email}
              </p>
              <p>
                <i className="fa-solid fa-cake-candles"></i> {user.birthday}
              </p>
            </li>
            <div className='buttons'>
              <button className='trash' onClick={() => deleteUser(user)}><i className="fa-solid fa-trash"></i></button>
              <button className='pencil' onClick={() => setUserSelected(user)}><i className="fa-solid fa-pencil"></i></button>{/* esto es para seleccionar, o sea, la primera fase del update */}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default UsersList;