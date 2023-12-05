import { deleteUser } from "../../Services/Request";
import Modal from "../Modal/Modal";

interface DeleteUserProps {
    id: string; 
    token: string;
    onClose: () => void;
    onDelete: (id: string) => void; 
  }

export default function DeleteUser({ id, token, onClose, onDelete }: DeleteUserProps) {

  function deleteUserById() {
    deleteUser(parseInt(id, 10), token)
    .then((response) => {
      if (response.ok) {
        onClose();
        onDelete(id);
      } else {
        console.error(response.status);
      }
    });
  }

  return (
    <>
      <Modal
        onClose={onClose}
        title="Delete User"
        action={deleteUserById}
        nameAction="Yes, delete it."
      >
        <div>
          <span>Do you want to delete this user?</span>
        </div>
      </Modal>
    </>
  );
}