import React, { useState } from "react";
import { Product } from '../../pages/Waiter/OrdersList';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import style from './MainOrder.module.css'
import IconoDelete from '../../assets/IconoDelete.png'
import NavigateTo from "../Navigate/navigate";
import { postOrder } from "../../Services/Request";

type MainOrderProps = {
  selectedProducts: Product[];
  handleRemoveSelectItems: (product: Product) => void;
  handleAddToSelectedItems: (product: Product) => void;
  handleDeleteSelectedItem: (product: Product) => void;
};

const MainOrder: React.FC<MainOrderProps> = ({ selectedProducts, handleRemoveSelectItems, handleAddToSelectedItems, handleDeleteSelectedItem }) => {

  const token = localStorage.getItem("token");
  const handleClick = NavigateTo("/Waiter/orders");
  const handleReturn = NavigateTo("/Waiter/dashboard")


  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + (product.price * product.quantity),
      0
    );
  };

  const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });
  const [dataEntry] = useState(currentDateTime);

  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [status] = useState("Pending");

  function handleAddOrder(table: string) {
    if (token === null) {
      // Manejo de error si token es nulo
      throw new Error('Token is null. Cannot make the request.');
    }

    const data = {
      table: table,
      client: client,
      products: selectedProducts,
      status: status,
      dataEntry: dataEntry,
    };
  

    postOrder(data, token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        throw error;
      });
  }
  return (
    <>
      <Container className={style.Container_order}>
        <section className={style.section_order}>
          <Form>
            <Row>
              <Col>
                <Form.Label>Client</Form.Label>
                <Form.Control placeholder="Client name"
                  onChange={(e) => setClient(e.target.value)} />
              </Col>
              <Col>
                <Form.Label>Table</Form.Label>
                <Form.Control placeholder="# Table"
                  onChange={(e) => setTable(e.target.value)} />
              </Col>
            </Row>
          </Form>
        </section>
        <section>
          <div className={style.table}>
            <h3>ORDER</h3>
            <Table striped size="sm">
              <thead>
                <tr>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveSelectItems(product)}
                      >
                        -
                      </Button>
                    </td>
                    <td>{product.quantity}</td>
                    <td width='10px'>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAddToSelectedItems(product)}
                      >
                        +
                      </Button>
                    </td>
                    <td>${(product.price * product.quantity).toFixed(2)}</td>
                    <td><img src={IconoDelete} alt="Delete" width="30px" height="25px"
                      onClick={() => handleDeleteSelectedItem(product)} /></td>
                  </tr>
                ))}
                <tr><td colSpan={6}>
                  <strong>TOTAL: ${calculateTotal()}</strong>
                </td>
                </tr>
              </tbody>
            </Table>
            <div className={style.Button}>
              <Button>
                <img
                  alt="Return"
                  src="/src/assets/IconoReturn.png"
                  width="30"
                  height="30"
                  onClick={handleReturn} />
              </Button>
              <Button type="submit" size="sm"
                onClick={() => { handleAddOrder(table); handleClick() }}>
                SEND
              </Button>
              <Button type="submit" size="sm"
                onClick={() => { handleClick() }}>
                ALL ORDERS
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};


export default MainOrder;