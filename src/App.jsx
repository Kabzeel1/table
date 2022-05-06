import { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./components/Read";
import EditableRow from "./components/Edit";
import data from "./mock-data.json";
const App = () => {
  const [users, setUsers] = useState(data);
  const [sort, setSort] = useState("ASC")
  
  const sorting = (col)=>{
    if (sort === "ASC"){
      const sorted = [...users].sort((a,b)=>
      a[col] > b[col] ? 1 : -1
      );
      setUsers(sorted)
      setSort("DSC")
    }
    if (sort === "DSC"){
      const sorted = [...users].sort((a, b)=>
      a[col] < b[col] ? 1 : -1
      );
      setUsers(sorted)
      setSort("ASC")
    }
  };
  const [addFormData, setAddFormData] = useState({
    Idn: "",
    first: "",
    last: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    Idn: "",
    first: "",
    last: "",
    phoneNumber: "",
    email: "",
  });

  const [editUserId, setEditUserId] = useState([]);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: nanoid(),
      Idn: addFormData.Idn,
      first: addFormData.first,
      last: addFormData.last,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newUsers = [...users, newUser];
    setUsers(newUsers);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedUser = {
      id: editUserId,
      Idn: editFormData.Idn,
      first: editFormData.first,
      last: editFormData.last,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === editUserId);

    newUsers[index] = editedUser;

    setUsers(newUsers);
    setEditUserId(null);
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      Idn: user.Idn,
      first: user.first,
      last: user.last,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleDeleteClick = (userId) => {
    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === userId);

    newUsers.splice(index, 1);

    setUsers(newUsers);
  };

  return (
    <div className="app-container">
      <h1>Seasonshare</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th onClick={()=>sorting("Idn")}>Id ⬆️</th>
              <th onClick={()=>sorting("first")}>First ⬆️</th>
              <th onClick={()=>sorting("last")}>Last ⬆️</th>
              <th onClick={()=>sorting("email")}>Email ⬆️</th>
              <th onClick={()=>sorting("phoneNumber")}>Phone Number ⬆️</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Fragment>
                {editUserId === user.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    user={user}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a User</h2>
      <form onSubmit={handleAddFormSubmit} className='form'>
        <input
          type="text"
          name="Idn"
          required="required"
          placeholder="Enter User Id..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="first"
          required="required"
          placeholder="First Name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="last"
          required="required"
          placeholder="Last Name ..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Email ..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Phone number ..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;