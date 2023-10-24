import { useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import MainOrder from "../../components/MainOrder/MainOrder";
import Menu from "../../components/Menu/Menu";


export interface Product {
  type: string;
  id: number;
  name: string;
  price: number;
  image: string;
  quantity:number;
}

export default function OrderList() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const addToSelectedItems = (product:Product) => {
     // Implementa la lógica para agregar productos a selectedProducts
     setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      { ...product, quantity: 1 },
    ]);
  };

    return (
      <main>
        <AppBar></AppBar>
        <div className="Principal">
        <Menu addToSelectedItems={addToSelectedItems}></Menu>
        <MainOrder selectedProducts={selectedProducts}></MainOrder>
        </div>
      </main>
    )
}