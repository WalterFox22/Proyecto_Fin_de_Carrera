import { Col, Container, Row } from "react-bootstrap";
import VerVehiculo from "./ListaVehi";


const ListarVehiculo = () => {
  return (
    <>
         <Container fluid className="p-3">
            {/* Encabezado */}
            <div className="text-center mb-4">
                <h1>Listar Vehiculo</h1>
                <hr />
                <p>Este módulo te permite visualizar la reserva.</p>
            </div>

            {/* Contenido principal */}
            <Row className="justify-content-center align-items-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <VerVehiculo/>
                </Col>
            </Row>
        </Container>
        
      </>
  );
};

export default ListarVehiculo;
