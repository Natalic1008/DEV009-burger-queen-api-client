import { users } from "../../Services/Request";
import { useEffect, useState } from "react";
import NavigateTo from "../Navigate/navigate";
import AddUser from "../AddUser/AddUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import EditUser from "../EditUser/EditUser";
import { Button, Table } from "react-bootstrap";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }


export default function ManageUsersTable() {

  const token = localStorage.getItem("token");
  const handleClick = NavigateTo("/admin/dashboard");

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModals, setShowModals] = useState<Record<string, boolean>>({});
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  function getAllUsers(token: string | null) {
    users(token||"")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      setAllUsers(data);
      return data;
    });
  }

  useEffect(() => {
    getAllUsers(token)
  }, [token]);


  const handleOpenModal = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
  };

  const handleOpenDelete = (id:number) => {
    setUserIdToDelete(String(id));
    setShowModalDelete(true);
  };

  const handleCloseDelete = () => {
    setUserIdToDelete(null);
    setShowModalDelete(false);
  };

  const handleDeleteUser = () => {
    getAllUsers(token);
  };

  const handleOpenEdit = (userId:number) => {
    setShowModals((prevModals) => ({ ...prevModals, [userId]: true }));
  };

  const handleCloseEdit = (userId:number) => {
    setShowModals((prevModals) => ({ ...prevModals, [userId]: false }));
  };

  const handleUpdateUser = () => {
    getAllUsers(token);
  };

  const handleAddNewUser = () => {
    getAllUsers(token);
    setShowModalAdd(false);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between" style={{ width: '95%' }}>
        <div className="d-flex align-items-center">
          <img src="/src/assets/IconoReturn.png"  width="30"
            height="30" onClick={handleClick}  alt="Return" />
          <h2 className="ml-2">Manage Users</h2>
        </div>
        <Button variant="success" onClick={handleOpenModal}> Añadir Usuarios </Button>
        {showModalAdd && (
          <AddUser
            onClose={handleCloseModal}
            token={token||""}
            onAdd={handleAddNewUser}
          />
        )}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((val) => (
            <tr key={val.id}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.role}</td>
              <td>
                <Button variant="success" onClick={() => handleOpenEdit(val.id)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleOpenDelete(val.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {allUsers.map((val) => (
        <div key={val.id}>
          {showModals[val.id] && (
            <EditUser
              id={val.id}
              name={val.name}
              email={val.email}
              role={val.role}
              token={token||""}
              onClose={() => handleCloseEdit(val.id)}
              onEdit={handleUpdateUser}
            />
          )}
        </div>
      ))}

      {showModalDelete && (
        <DeleteUser
          id={userIdToDelete||""}
          token={token||""}
          onClose={handleCloseDelete}
          onDelete={handleDeleteUser}
        />
      )}
    </>
  );
}