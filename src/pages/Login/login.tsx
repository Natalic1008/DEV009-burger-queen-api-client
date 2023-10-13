import LoginForm from "../../components/LoginForm/login-form";
import logo from "../../assets/hamburguesa.png"

export default function Login() {
  return (
    <main>
      <div className="Principal">
        <h1> BURGER QUEEN </h1>
        <img src={logo} alt="Logo hamburguesa" height={200} width={250}></img>
      </div>
      <div>
        <LoginForm />
      </div>
    </main>
  )

}