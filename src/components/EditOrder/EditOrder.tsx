import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigateTo from "../Navigate/navigate";
import { patchOrder, userOrder } from "../../Services/Request";
import Menu from "../Menu/Menu";
import { Product } from "..//../pages/Waiter/OrdersList";

type OrderInfo = {
  client: string;
};

type Item = {
  id: string;
  qty?: number;
};

export default function EditOrder() {
  const token = localStorage.getItem("token") ?? "";
  const [selectedItems, setSelectedItems] = useState<(Product | (Item & { quantity: number }))[]>([]);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({ client: "" });
  const { orderId } = useParams();
  const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });
  const [dataEntry] = useState(currentDateTime);

  const handleClick = NavigateTo("/Waiter/orders");
  const handleReturn = NavigateTo("/Waiter/orders");

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccessAlert = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccess(false);
    handleClick();
  };

  useEffect(() => {
    if (orderId && token) {
      userOrder(orderId, token)
        .then((response) => {
          if (!response.ok) {
            throw new Error("No existe productos");
          }
          return response.json();
        })
        .then((data) => {
          setOrderInfo(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderId, token]);

  const handleAddToSelectedItems = (item: Product | (Item & { quantity: number })) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );

    if (existingItem) {
      const updatedItems = selectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          return { ...selectedItem, quantity: selectedItem.quantity + 1 };
        }
        return selectedItem;
      });
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveSelectedItems = (item: Product | (Item & { quantity: number })) => {
    const itemIndex = selectedItems.findIndex(
      (selectedItem) => Number(selectedItem.id) === item.id
    );

    if (itemIndex !== -1) {
      const updatedItems = [...selectedItems];

      if (updatedItems[itemIndex].quantity > 1) {
        updatedItems[itemIndex].quantity -= 1;
      } else {
        updatedItems.splice(itemIndex, 1);
      }
      setSelectedItems(updatedItems);
    }
  };

  function handleEditOrder(updateData: any) {
    if (orderId && token) {
      const updatedOrderData = {
        ...updateData,
        dataEntry: dataEntry,
        dateProcessed: null,
        status: "Pending",
      };

      patchOrder(orderId, updatedOrderData, token)
        .then((response) => {
          if (response.ok) {
            handleSuccessAlert();
          }
          return response.json();
        })
        .then((newData) => {
          return newData;
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud de edición", error);
        });
    }
  }

  return (
    <main>
      <section>
        <div>
          <img
            alt="Return"
            src="/src/assets/IconoReturn.png"
            width="30"
            height="30"
            onClick={handleReturn}
          />
          <span>{orderInfo && orderInfo.client}</span>
        </div>
        <Menu handleAddToSelectedItems={handleAddToSelectedItems} />
        <div onClick={handleClick}>
          <span>All Orders</span>
        </div>
      </section>
      selectedItems={selectedItems}
      handleAddToSelectedItems={handleAddToSelectedItems}
      handleRemoveSelectedItems={handleRemoveSelectedItems}
      handleEditOrder={handleEditOrder}
      orderInfo={orderInfo}
      {showSuccess && (
        <Alert
          type="success"
          message="Order successfully sent."
          option="Close"
          onClose={handleCloseSuccessAlert}
        />
      )}
    </main>
  );
}
