import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { products } from '../../Services/Request';
import style from "./Menu.module.css";
import { Product } from "..//../pages/Waiter/OrdersList";

type MenuProps = {
   handleAddToSelectedItems: (product: Product) => void;
};

export default function Menu({ handleAddToSelectedItems }: MenuProps) {
  const token = localStorage.getItem("token");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [menuType, setMenuType] = useState("Breakfast");

  useEffect(() => {
    products(token!)
      .then((response) => {
        if (!response.ok) {
          console.log(token);
          throw new Error("No existen productos");
        }
        return response.json();
      })
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleViewProducts = (menu: string) => {
    setMenuType(menu);
  };

  

  return (
    <Container className={style.menuContainer}>
      <div className={style.buttonMenu}>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton id="tbg-radio-1" value={1} onClick={() => handleViewProducts("Breakfast")} variant="outline-warning" className={style.buttonBreakfast}>
            <h3>Breakfast</h3>
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value={2} onClick={() => handleViewProducts("Lunch/Dinner")} variant="outline-warning">
           <h3> Lunch/Dinner</h3>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className={style.menuSelect}>
        {allProducts
          .filter((product) =>
            menuType === "Breakfast" ? product.type === "Breakfast" : product.type === "Lunch"
          )
          .map((product, index) => (
            <div 
            key={index} style={{ marginBottom: '10px' }}>
              <Button
                onClick={() => {
                  handleAddToSelectedItems(product);
                 
                }}
                variant="outline-warning"
                >
                <div className={style.cardsMenu}>
                  <div>
                    <img className={style.productsImage} src={product.image} height={35} alt={product.name} />
                    <span className={style.nameProduct}><h5>{product.name}</h5></span>
                    <span>${product.price}</span>
                  </div>
                </div>
              </Button>
            </div>
          ))}
      </div>
    </Container>
  );
}