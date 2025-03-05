import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Image, Button } from "react-bootstrap";
import LogoAdmin from '../assets/Image/Owner.avif';
import AuthContext from "../Context/AuthProvider";

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Container
        fluid
        className="p-0 d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        <Row className="flex-nowrap flex-grow-1 m-0" style={{ flex: 1 }}>
          {/* Sidebar */}
          <Col
            xs={12}
            md={3}
            lg={2}
            className="text-light p-3 d-flex flex-column"
            style={{
              backgroundColor: "#560C23",
              minHeight: "100vh",
              maxWidth: "250px",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <h2 className="text-center fw-bold">Vehículos ESFOT</h2>
            <div className="text-center my-4">
              <Image
                src={LogoAdmin}
                roundedCircle
                className="img-fluid border border-secondary"
                style={{ maxWidth: "80px", height: "auto" }}
              />
              <p className="mt-3" style={{ color: "white" }}>
                <span
                  className="bg-success rounded-circle d-inline-block me-2"
                  style={{ width: 10, height: 10 }}
                ></span>
                Bienvenido - {auth?.nombre || "Usuario desconocido"}
              </p>
              <p
                className="text-slate-400 text-center my-4 text-sm"
                style={{ color: "white" }}
              >
                Rol - {auth?.rol}
              </p>
            </div>
            <hr />
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/dashboard"
                className={
                  urlActual === "/dashboard"
                    ? "active text-light bg-secondary rounded p-2"
                    : "text-light"
                }
              >
                Perfil
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/clientes"
                className={
                  urlActual === "/dashboard/clientes"
                    ? "active text-light bg-secondary rounded p-2"
                    : "text-light"
                }
              >
                Registrar Cliente
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/vehiculos"
                className={
                  urlActual === "/dashboard/vehiculos"
                    ? "active text-light bg-secondary rounded p-2"
                    : "text-light"
                }
              >
                Registrar Vehículos
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/reservas"
                className={
                  urlActual === "/dashboard/reservas"
                    ? "active text-light bg-secondary rounded p-2"
                    : "text-light"
                }
              >
                Registrar Reservas
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/vehiculos"
                className={
                  urlActual === "/dashboard/listar-vehiculos"
                    ? "active text-light bg-secondary rounded p-2"
                    : "text-light"
                }
              >
                Listar Vehiculos
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/dashboard/listar-reservas"
                className={
                  urlActual === "/dashboard/listar-reservas"
                    ? "active text-light bg-secondary rounded p-2"
                    : "text-light"
                }
              >
                Listar Reservas
              </Nav.Link>
              
            </Nav>
          </Col>

          {/* Main Content */}
          <Col
            className="d-flex flex-column p-0"
            style={{ minHeight: "100vh", flexGrow: 1 }}
          >
            {/* Top Navbar */}
            <Navbar
              className="justify-content-end px-3"
              style={{ backgroundColor: "#F8F9FA" }}
            >
              <Navbar.Text
                className="me-3"
                style={{ color: "black", fontSize: "18px" }}
              >
                Usuario - {auth?.nombre}
              </Navbar.Text>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                roundedCircle
                width={40}
                height={40}
                className="border border-success me-3"
              />
              <Button
                variant="danger"
                as={Link}
                to="/"
                onClick={() => localStorage.removeItem("token")}
              >
                Salir
              </Button>
            </Navbar>

            {/* Dynamic Content */}
            <div
              className="flex-grow-1 p-4 bg-light"
              style={{ minHeight: "calc(100vh - 56px)", overflow: "auto" }}
            >
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
