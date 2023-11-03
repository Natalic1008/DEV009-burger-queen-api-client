//import logo from "../../assets/hamburguesa.png"
import { Navbar, Container, Nav } from 'react-bootstrap'
import style from "./AppBar.module.css"

export default function AppBar() {
  const userRole = localStorage.getItem("role");

  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  }


  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#/">
            <img
              alt=""
              src="/src/assets/hamburguesa.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            <Navbar.Text className={style.tituloNav}>Burger Queen</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className={style.userRole}>
              <Nav.Item>
                <span>{userRole}</span>
              </Nav.Item>
            </Nav>
            <Nav.Item>
              <Nav.Link href="/" onClick={signOut} className={style.iconSignOut} data-testid="signout">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
              </Nav.Link>
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
