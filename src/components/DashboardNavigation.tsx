import { useNavigate } from "react-router-dom";

export default function DashboardNavigation() {
  const userRole = localStorage.getItem("role");

  const adminButtons = [
    {  title: "Manage Users", path: "/admin/users" },
    {  title: "Manage Products", path: "/admin/products" },
    {  title: "All Orders", path: "/admin/orders" },
  ];

  const dashboardButtons =
  userRole === "Admin" || userRole === "admin"
    ? adminButtons
    : [];
 

  const navigateTo = useNavigate();

  function handleClick(path:string) {
      navigateTo(path);
  }
  
  return (
    <section >
        {dashboardButtons.map((val, key) => (
            <button  key={key} onClick={() => handleClick(val.path)}>
                {val.title}
            </button>
        ))}
    </section>
);
}