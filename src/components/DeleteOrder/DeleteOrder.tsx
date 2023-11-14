import React from 'react';
import { deleteOrder } from "../../Services/Request";
import Modal from "../Modal/Modal";


type DeleteOrderProps = {
    id: number;
    token: string;
    onClose: () => void;
    onDelete: (id: number) => void;
  };

  const DeleteOrder: React.FC<DeleteOrderProps> = ({ id, token, onClose, onDelete }) => {

    function deleteOrderById() {
      deleteOrder(id, token)
      .then((response) => {
        if (response.ok) {
          onClose();
          onDelete(id);
        }
      });
    }
  
    return (
      <>
        <Modal
          onClose={onClose}
          title="Delete Order"
          action={deleteOrderById}
          nameAction="Yes, delete it."
        >
          <div>
            <span>Do you want to delete this order?</span>
          </div>
        </Modal>
      </>
    );
  }

  export default DeleteOrder;