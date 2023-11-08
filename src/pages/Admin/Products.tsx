import AppBar from "../../components/AppBar/AppBar";
import CurrentDate from "../../components/CurrentDate/CurrentDate";
import ManageProductsTable from "../../components/ManageProductsTable/MangeProductsTable";

export default function Products() {
  return (
    <>
      <AppBar />
      <CurrentDate />
      <ManageProductsTable />

    </>
  );
}