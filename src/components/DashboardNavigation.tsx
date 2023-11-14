import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DashboardNavigation() {
  const userRole = localStorage.getItem("role");

  const adminButtons = [
    {  title: "Manage Users", path: "/admin/users" },
    {  title: "Manage Products", path: "/admin/products" },
    {  title: "All Orders", path: "/admin/orders" },
  ];

  const waiterButtons = [
    { title: "New Order", path: "/waiter/new" },
    { title: "All Orders", path: "/waiter/orders" },
  ];
  const chefButton = [
  { title: "All Orders", path: "/chef/orders" },
  ];


  const dashboardButtons =
    userRole === "Admin" || userRole === "admin"
      ? adminButtons
      : userRole === "Chef" || userRole === "chef"
        ? chefButton
        : waiterButtons;

  const navigateTo = useNavigate();

  function handleClick(path:string) {
      navigateTo(path);
  }
  
  return (
    <section >
        {dashboardButtons.map((val, key) => (
            <Button  key={key} onClick={() => handleClick(val.path)}>
                {val.title}
            </Button>
        ))}
    </section>
);
}