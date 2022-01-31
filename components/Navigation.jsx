import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = ({ className = "" }) => {
  return (
    <Navbar bg="dark" variant="dark" className={className}>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Next Meal</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          <Link href="/beef" passHref>
            <Nav.Link>Beef</Nav.Link>
          </Link>
          <Link href="/dessert" passHref>
            <Nav.Link>Dessert</Nav.Link>
          </Link>

          <Link href="/breakfast" passHref>
            <Nav.Link>Breakfast</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
