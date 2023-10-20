import { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { products } from '../../Services/Request';
import { func } from "prop-types";

interface val {
  type: string;
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Menu({ handleAddToSelectedItems }) {
  const token = localStorage.getItem("token");
  const [allProducts, setAllProducts] = useState([]);
  const [menuType, setMenuType] = useState("Breakfast");
  
  useEffect(() => {
    products(token)
    .then((response) => {
      if (!response.ok) {
        console.log(token)
          throw new Error("No existen productos");
        }
        return response.json();
      })
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
      });
    }, [token]);
    const viewProducts = (menu) => {
      setMenuType(menu);
    };
    

    return (
      <>
      <Container>
        <div>
          <Button variant='primary' onClick={() => viewProducts("Breakfast")}>Breakfast</Button>
          <Button variant='secondary' onClick={() => viewProducts("Lunch/Dinner")}>Lunch/Dinner</Button>
        </div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Products</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {allProducts
                .filter((product) =>
                menuType === "Breakfast" 
                ? product.type === "Breakfast"
                : product.type === "Lunch"
                )
                 .map((val,key) => (
                  <tr 
                  key={key}
                  onClick={() => handleAddToSelectedItems(val)}
                  >
                    <td>{val.name}</td>
                    <td>{val.price}</td>
                    <td>
                      <img src={val.image} height={50}></img>
                    </td>
                  </tr>
                ))}
            </tbody>            
          </Table>
        </div>
      </Container>
    </>
  );
}

Menu.protoTypes = {
  handleAddToSelectedItems: func.isRequired,
};

