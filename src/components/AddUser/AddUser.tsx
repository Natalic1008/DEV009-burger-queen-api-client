import { useState } from "react";
import { addUsers } from "../../Services/Request";
import Modal from "../Modal/Modal";

interface AddUserProps {
    onClose: () => void;
    token: string;
    onAdd: (user: any) => void; 
  }

export default function AddUser({ onClose, token, onAdd }: AddUserProps) {
  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addRole, setAddRole] = useState("");
  const [error, setError] = useState<string | null>(null);

  const data = {
    email: addEmail,
    password: addPassword,
    name: addName,
    role: addRole,
    id: addId,
  };

  function handleAddNewUser() {
    addUsers(data, token)
      .then((response) => {
        if (response.status === 500) {
          setError("ID already in use.");
        } else if (response.status === 400) {
          setError("This email is already in use, or it's invalid.");
        } else {
          return response.json()
          .then((newUserData) => {
              onAdd(newUserData.user);
              onClose();
          });
        }
      })
      .catch(() => {
        setError("An error occurred while adding the user.");
      });
  }

  return (
    <Modal
      onClose={onClose}
      title="Add User"
      action={handleAddNewUser}
      nameAction="Add"
    >
      <div>
        <div>
          <label>ID</label>
          <input
            type="text"
            value={addId}
            onChange={(e) => setAddId(e.target.value)}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={addEmail}
            onChange={(e) => setAddEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={addPassword}
            onChange={(e) => setAddPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Role</label>
        <select
          value={addRole}
          onChange={(e) => setAddRole(e.target.value)}
        >
          <option>--</option>
          <option value="Admin">Admin</option>
          <option value="Chef">Chef</option>
          <option value="Waiter">Waiter</option>
        </select>
      </div>
      {error && (
        <div >
          <span >
            {error}
          </span>
        </div>
      )}
    </Modal>
  );
}

