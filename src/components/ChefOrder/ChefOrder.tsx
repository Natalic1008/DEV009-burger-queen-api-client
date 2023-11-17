import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import NavigateTo from "../Navigate/navigate";
import { allOrders } from "../../Services/Request";

type Order = {
  id: number;
  isPrepared: boolean;
}

export default function ChefOrders() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Order[]>([]);
  const handleClick = NavigateTo("/chef/dashboard");

  function getAllOrders(token: string | "") {
    if (typeof token === 'string') {
      allOrders(token)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setOrders(data);
        })
        .catch(() => {
          console.error("An error occurred while fetching the orders.");
        });
    } else {
      console.error("No token found in local storage.");
    }
  }

  useEffect(() => {
    if (token) {
      getAllOrders(token);
    }
  }, [token]);
  console.log(orders)

  function markAsPrepared(orderId: number) {
    setOrders(prevOrders =>
      prevOrders.length > 0
        ? prevOrders.map((order: Order) =>
            order.id === orderId ? { ...order, isPrepared: true } : order
          )
        : []
    );
  }

  return (
    <>
      <div>
        <div>
          <img
            alt="Return"
            src="/src/assets/IconoReturn.png"
            width="50"
            height="50"
            onClick={handleClick}
          />
          <h3>PENDING ORDERS</h3>
          <img
            src="/src/assets/IconoRefresh.png"
            alt="Refresh"
            width="50"
            height="50" />
        </div>
        <div>
          <Table>
            <thead>
              <tr>
                <th> TABLE</th>
                <th>PRODUCTS</th>
                <th>SHIPPONG TIME</th>
                <th>STATUS</th>
                <th>DELIVERED TIME</th>
                <th>DURATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.table}</td>
                  <td>
                  <ul>
                    {order.products.map((product, productIndex) => (
                      <li key={productIndex}>
                        {product.quantity}x {product.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td> {order.dataEntry} </td>
                <td>{order.status}</td>
                <td> {order.dateProcessed || "--"}</td>
                  {/* ... Otras celdas ... */}
                  <td>
                    {!order.isPrepared ? (
                      <button onClick={() => markAsPrepared(order.id)}>
                        OK
                      </button>
                    ) : (
                      "Preparado"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};