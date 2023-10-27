import { useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import MainOrder from "../../components/MainOrder/MainOrder";
import Menu from "../../components/Menu/Menu";
import style from "../Waiter/OrderList.module.css"


export type Product = {
  type: string,
  id: number,
  name: string,
  price: number,
  image: string,
  quantity:number,
  token:string,
}

export default function OrderList() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const addToSelectedItems = (product:Product) => {
     setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      { ...product, quantity: 1 },
    ]);
    console.log("selectedProducts updated:", selectedProducts);
  };

    return (
      <main>
        <AppBar></AppBar>
        <div className={style.main}>
        <Menu addToSelectedItems={addToSelectedItems}></Menu>
        <div className={style.order}>
        <MainOrder selectedProducts={selectedProducts}></MainOrder>
        </div>
        </div>
      </main>
    )
}