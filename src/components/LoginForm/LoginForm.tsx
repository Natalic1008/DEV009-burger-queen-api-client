import { useState } from "react";
import { auth } from "../../Services/Request"
import { saveData } from "../../Services/LocalData";
import { useNavigate } from "react-router-dom";
import style from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigateTo = useNavigate();

  function userAuth(e) {
    e.preventDefault();
    auth(email, password)
      .then((response) => {
        if (!response.ok) {
          setError("Credenciales invalidas")
          throw new Error('Error en la solicitud de inicio de sesión');
        }
        return response.json();
      })
      .then((data) => {
        saveData(data.accessToken, data.user.role, data.user.name);
        return data.user;
      })
      .then((user) => {
        if (user.role === 'admin' || user.role === 'Admin') {
          navigateTo("/admin/dashboard")
        } else if (user.role === 'waiter') {
          navigateTo("/Waiter/orders")
        } else {
          navigateTo("/chef/dashboard")
        }
      })
      .catch(() => {
        setError("Credenciales invalidas")
      });

  }
  return (<>

    <form name="formulario" className={style.section}>
      <input
        type='email'
        placeholder='Correo'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Contraseña'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={userAuth}>INGRESAR</button>
      {error &&
        <div className={style.error_message} >
          <span className={style.error}>{error}</span>
        </div>}
    </form>

  </>)
}

