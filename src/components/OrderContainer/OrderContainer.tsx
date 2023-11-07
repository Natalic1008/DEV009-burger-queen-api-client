import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { allOrders } from '../../Services/Request';
import { Product } from '../../pages/Waiter/OrdersList';
import NavigateTo from '../Navigate/navigate';

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
  //const role = localStorage.getItem("role");
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const handleClick = NavigateTo("/adm/dasboard");

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

  return (
    <section>
      <div>
        <img
              alt="Retorno"
              src="/src/assets/IconoReturn.png"
              width="50"
              height="50"
              onClick={handleClick}
        />
        <h2>ORDERS</h2>
        <Table responsive="sm" >
          <thead>
            <tr>
              <th> TABLE</th>
              <th> CLIENT</th>
              <th>PRODUCTS</th>
              <th>SHIPPONG TIME</th>
              <th>DELIVERED TIME</th>
              <th>STATUS</th>
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
                <td> {order.dateProcessed || "--"}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default OrderContainer