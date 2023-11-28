import { Container } from "react-bootstrap";
import CurrentDate from "../components/CurrentDate/CurrentDate";
import DashboardNavigation from "../components/DashboardNavigation";
import style from "../pages/Login/Login.module.css";
import logo from "../assets/hamburguesa.png";
import AppBar from "../components/AppBar/AppBar";

export default function Dashboard() {
  return (
    <Container>
      <AppBar/>
      <main className={style.main}>
        <div className={style.principal}>
          <h1 className={style.titulo}> BURGER QUEEN </h1>
          <img src={logo} alt="Logo hamburguesa" height={200} width={250}></img>
        </div>
        <div>
          <CurrentDate />
          <DashboardNavigation />
        </div>
      </main>
    </Container>
  );
}