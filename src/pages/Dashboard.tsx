import { Container } from "react-bootstrap";
import CurrentDate from "../components/CurrentDate/CurrentDate";
import DashboardNavigation from "../components/DashboardNavigation";
import style from "../pages/Login/Login.module.css";
import logo from "../assets/hamburguesa.png";

export default function Dashboard() {
  return(
  <Container>
    <main className={style.main}>
      <div className={style.principal}>
        <h1 className={style.titulo}> BURGER QUEEN </h1>
        <img src={logo} alt="Logo hamburguesa" height={200} width={250}></img>
      </div>
      <div></div>
      <CurrentDate />
      <DashboardNavigation />
    </main>
  </Container>
    );
}