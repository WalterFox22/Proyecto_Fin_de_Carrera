import React, { useEffect, useState } from "react";
import { Table, Card, Form, Button } from "react-bootstrap";
import Delete from "../assets/borrar1.png";
import Update from "../assets/actualizar.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";

const Lista = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [vehiculos, setVehiculos] = useState([]);

  const listarvehiculos = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setVehiculos(respuesta.data, ...vehiculos);
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para eliminar un paciente en base de "ID"
  const handleDelete = async (id) => {
    try {
      // Alerta de enviar antes de eliminar para evitar errores
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Vas a eliminar a un conductor. Si lo eliminas, debes registrar otro de inmediato.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        // definicion del token
        const token = localStorage.getItem("token");
        // establecer la ruta de acceso al backend
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/paciente/eliminar/${id}`;
        // Enviamos la solicitud al backend definicion de objeto para los headers
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        // objeto de data para registrar la salida donde el estado va estar en "false"
        const data = {
          salida: new Date().toString(),
        };
        // recibimos la respuesta del backend
        await axios.delete(url, { headers, data });
        listarvehiculos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Para que se ejecute una sola vez
  useEffect(() => {
    listarvehiculos();
  }, []);

  return (
    <>
      {vehiculos.length === 0 ? (
        <Alert variant="info">No existen registros</Alert>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="mt-5 shadow-lg bg-white"
        >
          <thead className="bg-dark text-white">
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Propietario</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((paciente, index) => (
              <tr key={paciente._id} className="text-center">
                <td>{index + 1}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.propietario}</td>
                <td>{paciente.email}</td>
                <td>{paciente.celular}</td>
                <td>
                  <span
                    className={`badge ${
                      paciente.estado ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {paciente.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="text-center">
                  <img
                    src={Update}
                    alt="Update"
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "7px",
                      cursor: "pointer",
                    }}
                    className="cursor-pointer inline-block"
                    onClick={() =>
                      navigate(
                        `/dashboard/buscar/conductor/ruta/${conductor.rutaAsignada}`
                      )
                    }
                  />

                  <img
                    src={Delete}
                    alt="Delete"
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "7px",
                      cursor: "pointer",
                    }}
                    className="cursor-pointer inline-block"
                    onClick={() => {
                      handleDelete(conductor._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Lista;
