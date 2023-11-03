import { useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import Menu from "../../components/Menu/Menu";
import MainOrder from "../../components/MainOrder/MainOrder";
import style from "../Waiter/OrderList.module.css";

export type Product = {
  type: string,
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number,
  token: string,
};
export default function OrderList() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleAddToSelectedItems = (product: Product) => {
    // Verifica si el producto ya está en la lista
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      // Si el producto ya está en la lista, actualiza la cantidad
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      // Si el producto no está en la lista, agrégalo con cantidad 1
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const handleRemoveSelectItems = (product: Product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        setSelectedProducts((prevSelectedProducts) =>
          prevSelectedProducts.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
          )
        );
      }
    }
  };

  const handleDeleteSelectedItem = (product: Product) => {
    const updatedProducts = selectedProducts.filter(
      (selectedProduct) => selectedProduct.id !== product.id
    );
    setSelectedProducts(updatedProducts);
  };

  return (
    <main>
      <AppBar />
      <div className={style.main}>
        <Menu 
         handleAddToSelectedItems={handleAddToSelectedItems}
        />
        <div className={style.order}>
          <MainOrder 
            selectedProducts={selectedProducts}
            handleRemoveSelectItems={handleRemoveSelectItems} 
            handleAddToSelectedItems={handleAddToSelectedItems}
            handleDeleteSelectedItem={handleDeleteSelectedItem}
            />
        </div>
      </div>
   </main>
  );
}