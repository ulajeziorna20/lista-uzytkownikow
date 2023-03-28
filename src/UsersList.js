import { useEffect, useState } from "react";
import "./UsersList.css";

const UsersList = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    usertype: "Admin",
  });

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData((prevDataForm) => {
      return { ...prevDataForm, [name]: target.value };
    });
  };

  const setUser = (e) => {
    e.preventDefault();
    setUsers(users.concat({ ...formData, id: Date.now() }));
    setFormData({
      username: "",
      email: "",
      usertype: "Admin",
    })
  };

  const removeUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id)
    setUsers(filteredUsers)
  }


  const filterList = (e) => {

    let btnTargetName = e.target.name

    let filtering

    if (btnTargetName === 'btnAdmins') {

      filtering = users.filter((user) => {
        return user.usertype === 'Admin'
      })
    }

    if (btnTargetName === 'btnUsers') {

      filtering = users.filter((user) => {
        return user.usertype === 'User'
      })
    }

    if (btnTargetName === 'btnAll') {

      filtering = users
    }

    setFilteredUsers(filtering)
  }


  useEffect(() => {
    setFilteredUsers(users)
  }, [users])


  return (
    <div className="usersList">
      <form onSubmit={setUser}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor="email">User email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="User email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <label htmlFor="usertype">User type</label>
        <select id="usertype" name="usertype" onChange={handleInputChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button>Save</button>
      </form>

      <button className="btnAdmin btn" name='btnAdmins' onClick={(e) => filterList(e)}>Wyśwetl tylko adminów</button>
      <button className="btnUser btn" name='btnUsers' onClick={(e) => filterList(e)}>Wyśwetl tylko userów</button>
      <button className="btnAll btn" name='btnAll' onClick={(e) => filterList(e)}>Wyśwetl wszystkich</button>

      <div className="list">
        {filteredUsers.map((user) => {
          return (
            <div className="userItem" key={user.id} onClick={() => removeUser(user.id)} >
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.usertype}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
