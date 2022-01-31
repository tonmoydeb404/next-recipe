import { Container } from "react-bootstrap";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
