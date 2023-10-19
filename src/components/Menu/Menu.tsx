import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

interface Product {
  type: string;
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);

  const viewProducts = () => {
    fetch('http://localhost:8080/products', {
      method: 'GET',
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhaXRlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY5NzczMjk4NywiZXhwIjoxNjk3NzM2NTg3LCJzdWIiOiIyIn0.WvGwfmE742hSNafI1sw29N-O_76tynV9bgJcBUnsL4k' }
    })
      .then(response => response.json())
      .then(data => setProducts(data))
  }

  return (
    <>
    <Container>
      <Button variant='primary' onClick={viewProducts}>Breakfast</Button>
      <Table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {
            products.filter(item => item.type === 'Lunch').map((product) =>
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <img src={product.image} height={50}></img>
                <Button variant='info'>Agregar</Button>
              </tr>
            )}
        </tbody>
      </Table>
    </Container>
    </>
  );
}
  
