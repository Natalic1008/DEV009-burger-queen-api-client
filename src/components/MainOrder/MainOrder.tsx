import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { Product } from '../../pages/Waiter/OrdersList';
import Table from 'react-bootstrap/Table';
import style from './MainOrder.module.css'
import { useState, useEffect } from 'react';
import IconoDelete from '../../assets/IconoDelete.png'


type MainOrderProps = {
  selectedProducts: Product[];
 setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>; 
}

const MainOrder: React.FC<MainOrderProps> = ({ selectedProducts,setSelectedProducts }) => {

  const [order, setOrder] = useState<{ [id: number]: number }>({});

  // Este efecto se ejecuta cada vez que selectedProducts cambia
  useEffect(() => {
   // Actualiza el estado de order basado en los productos seleccionados
   const newOrder: { [id: number]: number } = {};

   selectedProducts.forEach((product) => {
     if (newOrder[product.id]) {
       newOrder[product.id] += 1;
     } else {
       newOrder[product.id] = 1;
     }
   });

   setOrder(newOrder);
 }, [selectedProducts]);


 const addProduct = (product: Product) => {
  const updatedSelectedProducts = selectedProducts.map((p) => {
    if (p.id === product.id) {
      const updatedQuantity = p.quantity + 1;
      return {
        ...p,
        quantity: updatedQuantity,
       
      };
    }
    return p;
  });

  setSelectedProducts(updatedSelectedProducts);
};

const removeProduct = (product: Product) => {
  const updatedSelectedProducts = selectedProducts.map((p) => {
    if (p.id === product.id && p.quantity > 1) {
      const updatedQuantity = p.quantity - 1;
      return {
        ...p,
        quantity: updatedQuantity,
      };
    }
    return p;
  });

  setSelectedProducts(updatedSelectedProducts);
};


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
                  <th></th>
                  <th>+</th>
                  <th></th>
                  <th>-</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => addProduct(product)}
                      >
                        +
                      </Button>
                    </td>
                    <td>{product.quantity}</td>
                    <td width='10px'>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeProduct(product)}
                      >
                        -
                      </Button>
                    </td>
                    <td>${(product.price * (order[product.id] || 0)).toFixed(2)}</td>
                    <td><img src={IconoDelete} alt="Delete" width="30px" height="25px" /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6}>
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