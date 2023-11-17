import AppBar from "../../components/AppBar/AppBar";
import CurrentDate from "../../components/CurrentDate/CurrentDate";
import OrderContainer from "../../components/OrderContainer/OrderContainer";
import style from "../Waiter/OrderHistory.module.css";


export default function OrderHistory() {
  return (
    <main>
      <AppBar />
      <div className={style.CurrentDate_order}>
        <CurrentDate />
      </div>
      <div className={style.OrderContainer}>
        <OrderContainer id={0} table={""} client={""} products={[]} dataEntry={""} dateProcessed={null} status={""} />
      </div>
    </main>
  );
}