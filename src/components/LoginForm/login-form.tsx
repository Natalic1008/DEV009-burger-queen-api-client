const LoginForm = function () {
  return (<>
    
        <form name="formulario" method="post" action="/send/">
          <input type='email' placeholder='Correo' />
          <input type='password' placeholder='Contraseña' />
          <button type="submit">INGRESAR</button>
        </form>
     
  </>)
}

export default LoginForm;