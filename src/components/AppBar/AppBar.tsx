import logo from "../../assets/hamburguesa.png"
import { Navbar, Container } from 'react-bootstrap'

export default function AppBar() {
  const userRole = localStorage.getItem("role");
  return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
          <Navbar.Text style={{fontSize:40}} >Burger Queen</Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{userRole}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  </>
  )
}
