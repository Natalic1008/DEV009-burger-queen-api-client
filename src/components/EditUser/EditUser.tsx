import { useState } from "react";
import Modal from "../Modal/Modal";
import { editUser } from "../../Services/Request";

interface EditUserProps {
    name: string;
    email: string;
    role: string;
    id: number; 
    token: string;
    onEdit: (newData: any) => void; 
    onClose: () => void;
  }


export default function EditUser({
  name,
  email,
  role,
  id,
  token,
  onEdit,
  onClose,
}: EditUserProps) {
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedRole, setEditedRole] = useState(role);

  const data = {
    email: editedEmail,
    name: editedName,
    role: editedRole,
    id,
  };

  function editUserById() {
    editUser(id, data, token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((newData) => {
        onClose();
        onEdit(newData);
        return newData;
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud de edición", error);
      });
  }

  return (
    <>
      <Modal
        onClose={onClose}
        title="Edit User"
        action={editUserById}
        nameAction="Save Changes"
      >
        <div>
          <div>
            <label>ID</label>
            <input value={id} type="number" readOnly />
          </div>
          <div>
            <label>Name</label>
            <input
              value={editedName}
              type="text"
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Email</label>
            <input
              value={editedEmail}
              type="text"
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Role</label>
            <select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            >
              <option>--</option>
              <option value="Admin">Admin</option>
              <option value="Chef">Chef</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}