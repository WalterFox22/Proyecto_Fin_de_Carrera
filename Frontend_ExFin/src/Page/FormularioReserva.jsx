import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const FormularioReserva = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    codigo: "",
    descripcion: "",
    cliente: "",
    vehiculo: "",

  });

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_DESPLEGADO}/vehiculo/registroVehiculo`;
      const options = {
        headers: {
          method: 'POST',
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(url, options);
      setMensaje({ respuesta: "Vehiculo registrado con éxito", tipo: true });
    } catch (error) {
      console.error("Error al actualizar:", error.response?.data);
      setMensaje({ respuesta: error.response?.data?.msg || "Error desconocido", tipo: false });
      setTimeout(() => setMensaje({}), 3000);
    }
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="codigo" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>codigo</Form.Label>
          <Form.Control
            type="text"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Ingrese el codigo"
          />
        </Form.Group>

        <Form.Group controlId="descripcion" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>descripcion</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Ingrese la descripcion"
          />
        </Form.Group>
        <Form.Group controlId="cliente" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>cliente</Form.Label>
          <Form.Control
            type="text"
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            placeholder="Ingrese el cliente"
          />
        </Form.Group>

        <Form.Group controlId="vehiculo" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>vehiculo</Form.Label>
          <Form.Control
            type="text"
            name="vehiculo"
            value={form.vehiculo}
            onChange={handleChange}
            placeholder="Ingrese el vehiculo"
          />
        </Form.Group>

       

        

        <Button
          type="submit"
          variant="success"
          className="mx-auto d-block"
          style={{
            width: "200px",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
          }}
        >
          Registrar
        </Button>
      </Form>
    </>
  );
};

export default FormularioReserva;