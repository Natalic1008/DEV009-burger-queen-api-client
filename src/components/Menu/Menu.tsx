import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { products } from '../../Services/Request';
import { func } from "prop-types";
import style from "./Menu.module.css"
import {Product} from"..//../pages/Waiter/OrdersList"

type MenuProps = {
  addToSelectedItems: (product: Product) => void;
}

export default function Menu({ addToSelectedItems }: MenuProps) {

  const token = localStorage.getItem("token");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
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

    const viewProducts = (menu: string) => {
      setMenuType(menu);
    };
    

    return (
      <>
      <Container className={`col-md-4 ${style.Container} mx-auto`}>
        <div className={style.buttonMenu}>
          <Button variant='outline-primary' onClick={() => viewProducts("Breakfast")}>Breakfast</Button>
          <Button  variant='outline-primary' onClick={() => viewProducts("Lunch/Dinner")}>Lunch/Dinner</Button>
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
                variant="outline-primary" 
              >
                <div>
                  <p>{product.name }</p>
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
  addToSelectedItems: func.isRequired,
};

