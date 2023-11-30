import { patchOrder } from "../../Services/Request";
import Modal from "../Modal/Modal";
import NavigateTo from "../Navigate/navigate";

type CheckOutProps = {
  onClose: () => void;
  id: number; 
};


export default function CheckOut({ onClose, id }: CheckOutProps) {
  const token = localStorage.getItem("token");

  const navigateToOrders = NavigateTo("/waiter/orders");

  function checkOutOrder() {
    if (id && token) {
      const updatedOrderData = {
        status: "Closed",
      };

      patchOrder(id, updatedOrderData, token)
        .then((response) => {
          if (response.ok) {
            navigateToOrders();
          }
          return response.json();
        })
        .then((newData) => {
          onClose()
          return newData;
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud de cierre", error);
        });
    } else {
      console.error("ID or token is null")
    }
  }

  return (
    <>
      <Modal
        onClose={onClose}
        title="CheckOut"
        action={checkOutOrder}
        nameAction="Yes"
      >
        <span>Would you like to check out this order?</span>
      </Modal>
    </>
  )
}
