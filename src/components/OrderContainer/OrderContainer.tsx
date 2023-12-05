import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { allOrders } from '../../Services/Request';
import { Product } from '../../pages/Waiter/OrdersList';
import NavigateTo from '../Navigate/navigate';
import { Link } from 'react-router-dom';
import style from "../OrderContainer/OrderContainer.module.css"
import DeleteOrder from '../DeleteOrder/DeleteOrder';

type OrderProps = {
  id: number;
  table: string;
  client: string;
  products: Product[];
  dataEntry: string;
  dateProcessed: string | null;
  status: string;
}



const OrderContainer: React.FC<OrderProps> = () => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState<number | null>(null);
  const [showModalDelete, setModalDelete] = useState(false)

  const handleClick = NavigateTo("/admin/dashboard");

  function getOrderContainer(token: string | null) {
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
    getOrderContainer(token);
  }, [token]);

  const handleOpenDelete = (id: number) => {
    setOrderIdToDelete(id);
    setModalDelete(true);
  };

  const handleCloseDelete = () => {
    setOrderIdToDelete(null);
    setModalDelete(false)
  };

  const handleDelete = () => {
    if (orderIdToDelete !== null) {
      const updatedOrders = orders.filter(
        (order) => order.id !== orderIdToDelete
      );
      setOrders(updatedOrders);
      handleCloseDelete();
    }
  };

  return (
    <>
      <div className={style.headers}>
        <div className={style.main_header}>
          <img
            alt="Return"
            src="/src/assets/IconoReturn.png"
            width="30"
            height="30"
            onClick={handleClick}
          />
          <h4>ORDERS</h4>
        </div>
        <div>
          {role === "waiter" ? (
            <Link to="/waiter/new">
              New Order
            </Link>
          ) : null}
          <img
            src="/src/assets/IconoRefresh.png"
            alt="Refresh"
            width="30"
            height="30"
            onClick={() => getOrderContainer(token)}
          />
        </div>
      </div>
      <div>
        <Table className={style.table_responsive}>
          <thead>
            <tr>
              <th> TABLE</th>
              <th> CLIENT</th>
              <th>PRODUCTS</th>
              <th>SHIPPONG TIME</th>
              <th>STATUS</th>
              <th>DELIVERED TIME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.table}</td>
                <td>{order.client}</td>
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
                <td>
                  {order.status !== "Closed" ? (
                    <Link
                      to={`/waiter/editOrder/${order.id}`}
                    >
                      Update
                    </Link>
                  ) : null}
                  {role === "Admin" || role === "admin" ? (
                    <button
                      onClick={() => handleOpenDelete(order.id)}
                    >
                      Delete
                    </button>
                  ) : null}
                  {showModalDelete && (
                    <DeleteOrder
                      id={orderIdToDelete || 0}
                      token={token || ""}
                      onClose={handleCloseDelete}
                      onDelete={handleDelete}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </>
  );
};

export default OrderContainer