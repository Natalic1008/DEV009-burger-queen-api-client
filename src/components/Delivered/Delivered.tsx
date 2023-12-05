import { Button } from "react-bootstrap";
import { patchOrder } from "../../Services/Request";

 export interface UpdatableOrder {
  id: number;
  dataEntry: string;
  status: string;
  dateProcessed?: string;
  duration?: string;
}

type DeliveredProps = {
  order: UpdatableOrder;
  onEditSuccess: (updatedOrder: UpdatableOrder) => void;
};

export default function Delivered({ order, onEditSuccess }: DeliveredProps) {
  const token = localStorage.getItem("token");
  const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });

  function markOrderAsDelivered(order: UpdatableOrder) {
    function calculateDuration() {
      const timeString1 = order.dataEntry;
      const timeString2 = currentDateTime;
      const receivedTime = new Date(`1970-01-01T${timeString1}`).getTime();
      const deliveredTime = new Date(`1970-01-01T${timeString2}`).getTime();
      const differenceInMinutes = (deliveredTime - receivedTime) / (1000 * 60);

      return `${Math.floor(differenceInMinutes)} minutes`;
    }

    const updatedOrderData: UpdatableOrder = {
      id: order.id,
      dataEntry: order.dataEntry,
      status: "Delivered",
      dateProcessed: currentDateTime,
      duration: calculateDuration(),
    };

    patchOrder(order.id, updatedOrderData, token || "")
      .then((response) => {
        if (response.ok) {
          onEditSuccess(updatedOrderData);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(
          "Error al realizar la solicitud para marcar como entregada",
          error
        );
      });
  }

  return (
    <Button onClick={() => markOrderAsDelivered(order)}>Done</Button>
  );
}