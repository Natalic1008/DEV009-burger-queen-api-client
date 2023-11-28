import { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import NavigateTo from "../Navigate/navigate";
import { allOrders, patchOrder } from "../../Services/Request";

type Product = {
  quantity: number;
  name: string;
}

type Order = {
  id: number;
  isPrepared: boolean;
  table: string; 
  products: Product[]; 
  dataEntry: string; 
  status: string; 
  dateProcessed?: string; 
  duration?: string;
}

export default function ChefOrders() {
  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const handleClick = NavigateTo('/chef/dashboard');

  useEffect(() => {
    const storedCheckedItemsString = localStorage.getItem('checkedItems');
    const storedCheckedItems = storedCheckedItemsString
      ? JSON.parse(storedCheckedItemsString)
      : {};

    setCheckedItems(storedCheckedItems);

    if (token) {
      getAllOrders(token);
    }
  }, [token]);

  function getAllOrders(token: string | null) {
    if (token) {
      allOrders(token)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('No orders available.');
          }
        })
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error('No token found in local storage.');
    }
  }

  function markAsPrepared(orderId: number) {
    if (token) {
      const updatedOrderData = {
        status: 'Prepared',
        dateProcessed: new Date().toISOString(),
      };

      patchOrder(orderId.toString(), updatedOrderData, token)
        .then((response) => {
          if (response.ok) {
            getAllOrders(token);
          }
          return response.json();
        })
        .catch((error) => {
          console.error('Error marking order as prepared', error);
        });
    }
  }

  function toggleExpand(orderId: number) {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderId ? null : orderId
    );
  }

  function handleInfoClick(event: React.MouseEvent, orderId: number) {
    if (event.target instanceof HTMLImageElement) {
      toggleExpand(orderId);
    }
  }

  function handleCheckboxChange(productIndex: number, orderId: number) {
    setCheckedItems((prevCheckedItems) => {
      const updatedOrder = prevCheckedItems[orderId] || {};
      const currentStatus = updatedOrder[productIndex] || false;
      const newStatus = !currentStatus;
  
      const newCheckedItems = {
        ...prevCheckedItems,
        [orderId]: {
          ...updatedOrder,
          [productIndex]: newStatus,
        },
      };
  
      localStorage.setItem('checkedItems', JSON.stringify(newCheckedItems));
  
      return newCheckedItems as { [key: number]: { [key: number]: boolean } };
    });
  }

  return (
    <>
      <div>
        <div>
        <img
            src="/src/assets/IconoReturn.png"
            alt="Refresh"
            width="30"
            height="30"
            onClick={handleClick}/>
            <h1>Active Orders</h1>
        </div>
        <div>
          <img
            src="/src/assets/IconoRefresh.png"
            alt="Refresh"
            width="30"
            height="30"
            onClick={() => getAllOrders(token)}
          />
        </div>
      </div>
      <div>
        <Table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Table</th>
              <th>Received</th>
              <th>Status</th>
              <th>Delivered</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <React.Fragment key={order.id}>
                  <tr onClick={(event) => handleInfoClick(event, order.id)}>
                    <td>
                      <img 
                      src="/src/assets/Icono_desplegar"
                      alt="Info"
                      width="30"
                      height="30"/>
                    </td>
                    <td>{order.table}</td>
                    <td>{order.dataEntry}</td>
                    <td>{order.status}</td>
                    <td>{order.dateProcessed}</td>
                    <td>{order.duration}</td>
                    <td>
                      {order.status === 'Pending' && (
                        <Button
                          variant="success"
                          onClick={() => markAsPrepared(order.id)}
                        >
                          Mark Prepared
                        </Button>
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr
                      key={`expanded_${order.id}`}
                                          >
                      <td colSpan={7}>
                        <ul>
                          {order.products.map((product, productIndex) => (
                            <li key={productIndex}>
                              <input
                                type="checkbox"
                                checked={checkedItems[order.id]?.[productIndex] || false}
                                onChange={() => handleCheckboxChange(productIndex, order.id)}
                              />
                              <label>
                                {product.quantity}x {product.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}