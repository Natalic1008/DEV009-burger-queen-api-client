import React, { useState, useEffect } from "react";
import NavigateTo from "../Navigate/navigate";
import { allOrders } from "../../Services/Request";
import Delivered from "../Delivered/Delivered";
import { Table } from "react-bootstrap";
import {UpdatableOrder} from "../Delivered/Delivered"
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
};

type CheckedItems = { [orderId: number]: { [productIndex: number]: boolean } };

export default function ChefOrders() {
  const token: string | null = localStorage.getItem('token');
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: { [key: number]: boolean } }>({});
  const handleClick = NavigateTo('/chef/dashboard');

  function getAllOrders(token: string | null) {
    if (token) {
      allOrders(token)
        .then((response) => {
          if (!response.ok) {
            throw new Error("No orders available.");
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    const storedCheckedItems = JSON.parse(localStorage.getItem("checkedItems")|| "{}") || {};
    setCheckedItems(storedCheckedItems);

    getAllOrders(token);

  }, [token]);


  function toggleExpand(orderId:number) {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderId ? null : orderId
    );
  }

  function handleInfoClick(event: React.MouseEvent, orderId: number) {
    if ((event.target as HTMLElement).tagName === "IMG") {
      toggleExpand(orderId);
    }
  }

  const updatedOrderData = (updatedOrder: UpdatableOrder) => {
    setOrders((orders) =>
      orders.map((order) => {
        if (order.id === updatedOrder.id) {
          return {
            ...order,
            status: updatedOrder.status,
            dateProcessed: updatedOrder.dateProcessed,
            duration: updatedOrder.duration,
          };
        } else {
          return order;
        }
      })
    );
  };

  function handleCheckboxChange(productIndex: number, orderId: number) {
    setCheckedItems((prevCheckedItems: CheckedItems) => {
      const updatedOrder = prevCheckedItems[orderId] || {};
      const currentStatus = updatedOrder[productIndex] || false;
      const newStatus = !currentStatus;
  
      const newCheckedItems: CheckedItems = {
        ...prevCheckedItems,
        [orderId]: {
          ...(prevCheckedItems[orderId] || {}),
          [productIndex]: newStatus,
        },
      };
  
      localStorage.setItem("checkedItems", JSON.stringify(newCheckedItems));
  
      return newCheckedItems;
    });
  }

  return (
    <>
      <div>
        <div>
          <img
            src="/src/assets/IconoReturn.png"
            alt="Return"
            width="30"
            height="30"
            onClick={handleClick} />
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
        <Table>
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
            {orders.map((order, index) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <React.Fragment key={index}>
                  <tr onClick={(event) => handleInfoClick(event, order.id)}>
                    <td>
                      <img
                        src="/src/assets/Icono_desplegar"
                        alt="Info"
                        width="30"
                        height="30" />
                    </td>
                    <td>{order.table}</td>
                    <td>{order.dataEntry}</td>
                    <td>{order.status}</td>
                    <td>{order.dateProcessed}</td>
                    <td>{order.duration}</td>
                    <td>
                      {order.status === 'Pending' && (
                        <Delivered
                        order={order}
                        onEditSuccess={updatedOrderData}
                        />
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