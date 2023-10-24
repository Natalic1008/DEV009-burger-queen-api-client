import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import {Product} from'../../pages/Waiter/OrdersList';



interface MainOrderProps {
  selectedProducts: Product[];
}

const MainOrder : React.FC<MainOrderProps> = ({ selectedProducts }) => {


  return (<>
    <Container>
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
          <h1>Order</h1>
        <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
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
      </table>

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
