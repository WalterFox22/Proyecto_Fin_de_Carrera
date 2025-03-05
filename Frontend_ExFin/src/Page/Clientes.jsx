import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FormularioClientes from './FormularioClientes';


const Clientes = () => {
    return (
      <>
         <Container fluid className="p-3">
            {/* Encabezado */}
            <div className="text-center mb-4">
                <h1>Registro Conductor</h1>
                <hr />
                <p>Este módulo te permite visualizar y actualizar al conductor.</p>
            </div>

            {/* Contenido principal */}
            <Row className="justify-content-center align-items-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <FormularioClientes/>
                </Col>
            </Row>
        </Container>
        
      </>
    );
  };
  
  export default Clientes;
  