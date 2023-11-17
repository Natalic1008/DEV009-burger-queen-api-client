import AppBar from "../../components/AppBar/AppBar";
import ChefOrders from "../../components/ChefOrder/ChefOrder";
import CurrentDate from "../../components/CurrentDate/CurrentDate";
import style from "../Waiter/OrderHistory.module.css"

export default function ActiveOrders() {
    return (

        <main>
            <AppBar />
            <div className={style.CurrentDate_order}>
                <CurrentDate />
            </div>
            <ChefOrders />
        </main>

    );
}