import CurrentDate from "../../components/CurrentDate/CurrentDate";
import AllOrdersTable from "../../components/AllOrdersTable/AllOrdersTable"
import AppBar from "../../components/AppBar/AppBar";

export default function AllOrders() {
    return (
        <>
        <AppBar/>
        <CurrentDate/>
        <AllOrdersTable/>
        </>
    );
}