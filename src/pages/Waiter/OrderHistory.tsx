import AppBar from "../../components/AppBar/AppBar";
import CurrentDate from "../../components/CurrentDate/CurrentDate";
import OrderContainer from "../../components/OrderContainer/OrderContainer";


export default function OrderHistory() {
    return (
    <main>
      <AppBar/>
      <CurrentDate/>
      <OrderContainer id={0} table={""} client={""} products={[]} dataEntry={""} dateProcessed={null} status={""}/>

      </main>
    );
}