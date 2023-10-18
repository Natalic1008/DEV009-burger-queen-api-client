import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

export default function Menu() {
  const [products, setProducts] = useState([]);

  const viewProducts = () => {
    fetch('http://localhost:8080/products', {
      method: 'GET',
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhaXRlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY5NzYzOTAyOCwiZXhwIjoxNjk3NjQyNjI4LCJzdWIiOiIyIn0.pALQ35-9UamBVztIyIC7koeQNzFsGjhoa_E3ImqK_S0' }
    })
      .then(response => response.json())
      .then(data => setProducts(data))
  }

  return (
    <>
      <Button variant='primary' onClick={viewProducts}>Desayuno</Button>
      <Table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {
            products.filter(item => item.type === 'Beverages').map((product) =>
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            )}
        </tbody>
      </Table>

    </>
  );
}
  
