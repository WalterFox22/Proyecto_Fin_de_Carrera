import { Col, Container, Row } from "react-bootstrap";
import FormularioVehiculo from "./FormularioVehiculo";

const Vehiculo = () => {
  return (
    <>
      <Container fluid className="p-3">
            {/* Encabezado */}
            <div className="text-center mb-4">
                <h1>Registro Vehiculo</h1>
                <hr />
                <p>Este módulo te permite Registrar Vehículo</p>
            </div>

            {/* Contenido principal */}
            <Row className="justify-content-center align-items-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <FormularioVehiculo/>
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default Vehiculo;
