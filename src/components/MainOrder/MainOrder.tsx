import React from "react";
import { Product } from '../../pages/Waiter/OrdersList';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import style from './MainOrder.module.css'
import IconoDelete from '../../assets/IconoDelete.png'

type MainOrderProps = {
  selectedProducts: Product[];
  handleRemoveSelectItems: (product: Product) => void;
  handleAddToSelectedItems:(product: Product) => void;
  handleDeleteSelectedItem:(product: Product) => void;
};

const MainOrder: React.FC<MainOrderProps> = ({ selectedProducts, handleRemoveSelectItems, handleAddToSelectedItems,handleDeleteSelectedItem }) => {
 
  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + (product.price * product.quantity),
      0
      );
  };
 

  return (
    <>
      <Container className={style.Container_order}>
        <section>
          <Form>
            <Row>
              <Col>
                <Form.Label>Client</Form.Label>
                <Form.Control placeholder="Client name" />
              </Col>
              <Col>
                <Form.Label>Table</Form.Label>
                <Form.Control placeholder="# Table" />
              </Col>
            </Row>
          </Form>
        </section>
        <section>
          <div>
            <h2>ORDER</h2>
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
                         onClick={() => handleDeleteSelectedItem(product)}/></td>
                  </tr>
                ))}
                <tr><td colSpan={6}>
                  <strong>TOTAL: ${calculateTotal()}</strong>
                </td>
                </tr>
              </tbody>
            </Table>
            <Button type="submit" size="sm" data-testid="send_order">
              Send
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
};


export default MainOrder;