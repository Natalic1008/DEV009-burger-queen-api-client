import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/hamburguesa.png"
import style from "./Login.module.css"
import { Container } from "react-bootstrap";

export default function Login() {
  return (
    <Container>
      <main className={style.main}>
        <div className={style.principal}>
          <h1 className={style.titulo}> BURGER QUEEN </h1>
          <img src={logo} alt="Logo hamburguesa" height={200} width={250}></img>
        </div>
        <div>
          <LoginForm />
        </div>
      </main>
    </Container>
  )

}