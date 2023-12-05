import AppBar from "../../components/AppBar/AppBar";
import CurrentDate from "../../components/CurrentDate/CurrentDate";
import ManageUsersTable from "../../components/ManageUserTable/ManageUserTable";

export default function Users() {
  return (
    <>
      <AppBar />
      <CurrentDate />
      <ManageUsersTable />
    </>
  );
}