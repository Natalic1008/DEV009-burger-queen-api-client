import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { products } from '../../Services/Request';
import style from "./Menu.module.css";
import { Product } from "..//../pages/Waiter/OrdersList";

type MenuProps = {
  addToSelectedItems: (product: Product) => void;
}

export default function Menu({ addToSelectedItems }: MenuProps) {
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

  const viewProducts = (menu: string) => {
    setMenuType(menu);
  };

  // Cambio: Declara una variable para rastrear los productos seleccionados en el menú
  const [selectedProductsInMenu, setSelectedProductsInMenu] = useState<Product[]>([]);

  return (
    <Container className={style.menuContainer}>
      <div className={style.buttonMenu}>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton id="tbg-radio-1" value={1} onClick={() => viewProducts("Breakfast")} variant="outline-warning" className={style.buttonBreakfast}>
            Breakfast
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value={2} onClick={() => viewProducts("Lunch/Dinner")} variant="outline-warning">
            Lunch/Dinner
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className={style.menuSelect}>
        {allProducts
          .filter((product) =>
            menuType === "Breakfast" ? product.type === "Breakfast" : product.type === "Lunch"
          )
          .map((product, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Button
                onClick={() => {
                  addToSelectedItems(product);
                  // Cambio: Agrega el producto seleccionado a la lista de selectedProductsInMenu
                  setSelectedProductsInMenu([...selectedProductsInMenu, product]);
                }}
                variant="outline-warning"
                // Cambio: Deshabilita el botón de selección si el producto ya está en MainOrder
                disabled={selectedProductsInMenu.some((p: Product) => p.id === product.id)}
              >
                <div className={style.cardsMenu}>
                  <p>
                    <img className={style.productsImage} src={product.image} height={35} alt={product.name} />
                    <span className={style.nameProduct}>{product.name}</span>
                    <span>${product.price}</span>
                  </p>
                </div>
              </Button>
            </div>
          ))}
      </div>
    </Container>
  );
}