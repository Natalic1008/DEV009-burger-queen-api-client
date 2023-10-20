import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { products } from '../../Services/Request';
import { func } from "prop-types";
import style from "./Menu.module.css"

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
        console.error(error)
      });
    }, [token]);
    const viewProducts = (menu) => {
      setMenuType(menu);
    };
    

    return (
      <>
      <Container className={style.Container}>
        <div>
          <Button variant='outline-primary' size="lg" onClick={() => viewProducts("Breakfast")}>Breakfast</Button>
          <Button  variant='outline-primary' size="lg" onClick={() => viewProducts("Lunch/Dinner")}>Lunch/Dinner</Button>
        </div>
        <div className="d-flex justify-content-around">
        {allProducts
          .filter((product) =>
            menuType === "Breakfast" ? product.type === "Breakfast" : product.type === "Lunch"
          )
          .map((product, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Button
                onClick={() => addToSelectedItems(product)}
                variant="outline-primary" // Puedes cambiar la variante según tu preferencia
              >
                <div>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <img src={product.image} height={50} alt={product.name} />
                </div>
              </Button>
            </div>
          ))}
       </div>
      </Container>
    </>
  );
}

Menu.protoTypes = {
  handleAddToSelectedItems: func.isRequired,
};

