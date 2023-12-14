import NavigateTo from "../Navigate/navigate";
import { useState, useEffect } from "react";
import { allOrders } from "../../Services/Request";
import DeleteOrder from "../DeleteOrder/DeleteOrder";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";


export default function AllOrders() {
  const token: string | null = localStorage.getItem("token");
  const role: string | null = localStorage.getItem("role");
  const handleClick = NavigateTo("/admin/dashboard");
  const [orders, setOrders] = useState<any[]>([]); 
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState<number | null>(null);

  function getAllOrders(token:string) {
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
  }

  useEffect(() => {
    getAllOrders(token ||"");
  }, [token]);

  const handleOpenDelete = (id:number) => {
    setOrderIdToDelete(id);
    setShowModalDelete(true);
  };

  const handleCloseDelete = () => {
    setOrderIdToDelete(null);
    setShowModalDelete(false);
  };

  const handleDelete = () => {
    if (orderIdToDelete) {
      const updatedOrders = orders.filter(
        (order) => order.id !== orderIdToDelete
      );
      setOrders(updatedOrders);
      handleCloseDelete();
    }
  };

  return (
    <>
      <div >
        <div >
          <img
            src="/src/assets/IconoReturn.png"
            width="30"
            height="30" onClick={handleClick} alt="Return" />
          <h2>All Orders</h2>
        </div>
        <div >
          {role === "Waiter" ? (

            <Link to="/waiter/new">
              New Order
            </Link>
          ) : null}
          <img
            src="/src/assets/IconoRefresh.png"
            alt="Refresh"
            width="30"
            height="30"
            onClick={() => getAllOrders(token||"")}
          />
        </div>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>TABLE</th>
              <th>CLIENT</th>
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
                    {order.products.map((product:any, productIndex:any) => (
                      <li key={productIndex}>
                        {product.quantity}x {product.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.dataEntry}</td>
                <td>{order.status}</td>                
                <td>{order.dateProcessed || "--"}</td>
                <td>
                  {order.status !== "Closed" ? (
                    <Link
                      to={`/waiter/editOrder/${order.id}`}
                    >
                      Update
                    </Link>
                  ) : null}
                  {role === "Admin" || role === "admin" ? (
                    <Button
                      onClick={() => handleOpenDelete(order.id)}
                    >
                      Delete
                    </Button>
                  ) : null}
                  {showModalDelete && (
                    <DeleteOrder
                      id={orderIdToDelete||0}
                      token={token||""}
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
}