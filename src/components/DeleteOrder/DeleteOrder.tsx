import { deleteOrder } from "../../Services/Request";

export default function DeleteOrder({ id, token, onClose, onDelete }) {

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