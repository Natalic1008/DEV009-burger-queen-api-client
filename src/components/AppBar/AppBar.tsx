import logo from "../../assets/hamburguesa.png"
import { Navbar, Container, Nav } from 'react-bootstrap'
import style from "./AppBar.module.css"

export default function AppBar() {
  const userRole = localStorage.getItem("role");
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#/">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            <Navbar.Text className={style.tituloNav}>Burger Queen</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className={style.navButton}>
              <Nav.Item>
                <span>Signed in as: {userRole}</span>
              </Nav.Item>
            </Nav>
              <Nav.Item>
                <Nav.Link href="/">Close sesion</Nav.Link>
              </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
