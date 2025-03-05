import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BarraListar from '../../componets/BarraListar';
import Loading from '../../componets/Loading/Loading';
import AuthContext from '../Context/AuthProvider';
import Lista from './Lista';

const ListarVehiculos = () => {

    const { auth } = useContext(AuthContext);

    return (
        <Container fluid className="p-3">
            {/* Encabezado */}
            <div className="text-center mb-4">
                <h1>Lista de Vehiculos</h1>
                <hr />
                <p>Este módulo te permite visualizar la lista de Vehículos.</p>
            </div>

            {/* Contenido principal */}
            <Row className="justify-content-center">
                <Col xs={12}>  {/* Ahora la columna ocupa todo el ancho en todos los tamaños de pantalla */}
                    {/* BarraListar ocupa todo el ancho dentro de la columna */}
                    {auth.nombre ? (
                        <Lista />
                    ) : (
                        <Loading />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ListarVehiculos;
