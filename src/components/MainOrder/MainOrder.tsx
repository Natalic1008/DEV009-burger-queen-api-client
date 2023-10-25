import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import {Product} from'../../pages/Waiter/OrdersList';
import Table from 'react-bootstrap/Table';
import style from './MainOrder.module.css'


interface MainOrderProps {
  selectedProducts: Product[];
}

const MainOrder : React.FC<MainOrderProps> = ({ selectedProducts }) => {


  return (<>
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
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

          <Button type="submit" size="sm"
            data-testid="send_order">
            Send
          </Button>
        </div>
      </section>
    </Container>
  </>)
}

export default MainOrder;
