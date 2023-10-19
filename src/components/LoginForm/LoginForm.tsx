import { useState } from "react";
import { auth } from "../../Services/Request"
import { saveData } from "../../Services/LocalData";
import { useNavigate } from "react-router-dom";
import style from "./LoginForm.module.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
          setError("Invalid credentials")
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
    <Form className={style.section} data-testid="form_login" >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          data-testid="email_login"
          onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          data-testid="password_login"
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button className="btn btn-success" type="submit" onClick={userAuth} data-testid="submit_login">
      LOGIN
      </Button>
      {error &&
        <div className={style.error_message} >
          <span className={style.error}>{error}</span>
        </div>}
    </Form>
  </>)
}

