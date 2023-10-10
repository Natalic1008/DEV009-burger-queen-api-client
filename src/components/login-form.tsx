import logo from './hamburguesa.png'
const LoginForm = function () {
  return (<>
    <header>
      <div className="Principal">
        <h1> BURGER QUEEN </h1>
        <img src={logo} alt="Logo hamburguesa" height={200} width={250}></img>
        <form name="formulario" method="post" action="/send/">
          <input type='email' placeholder='Correo' />
          <input type='password' placeholder='Contraseña' />
          <button type="submit">INGRESAR</button>
        </form>
      </div>
    </header>
  </>)
}

export default LoginForm;