const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{user.Idn}</td>
      <td>{user.first}</td>
      <td>{user.last}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td className="button">
        <button
          type="button"
          onClick={(event) => handleEditClick(event, user)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;