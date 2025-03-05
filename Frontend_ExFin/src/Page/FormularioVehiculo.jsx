import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const FormularioVehiculo = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anio_fabricacion: "",
    placa: "",
    color: "",
    tipo_vehiculo:"",
    kilometraje: "",
    descripcion: null,

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

    // Opcional: Limpia espacios en todos los campos antes de enviar
    const cleanedForm = {
      ...form,
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      anio_fabricacion: form.anio_fabricacion.trim(),
      placa: form.placa.trim(),
      color: form.color.trim(),
      tipo_vehiculo:form.tipo_vehiculo.trim(),
      kilometraje: form.kilometraje.trim(),
      descripcion:form.descripcion.trim(),
    };

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

      await axios.post(url, cleanedForm, options);
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
        <Form.Group controlId="marca" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>marca</Form.Label>
          <Form.Control
            type="text"
            name="marca"
            value={form.marca}
            onChange={handleChange}
            placeholder="Ingrese la marca"
          />
        </Form.Group>

        <Form.Group controlId="anio_fabricacion" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>anio_fabricacion</Form.Label>
          <Form.Control
            type="text"
            name="anio_fabricacion"
            value={form.anio_fabricacion}
            onChange={handleChange}
            placeholder="Ingrese el anio_fabricacion"
          />
        </Form.Group>
        <Form.Group controlId="modelo" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>modelo</Form.Label>
          <Form.Control
            type="text"
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            placeholder="Ingrese el modelo"
          />
        </Form.Group>

        <Form.Group controlId="placa" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>placa</Form.Label>
          <Form.Control
            type="text"
            name="placa"
            value={form.placa}
            onChange={handleChange}
            placeholder="Ingrese la placa"
          />
        </Form.Group>

        <Form.Group controlId="color" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Ingrese el color"
          />
        </Form.Group>

        <Form.Group controlId="tipo_vehiculo" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>tipo_vehiculo</Form.Label>
          <Form.Control
            type="text"
            name="tipo_vehiculo"
            value={form.tipo_vehiculo}
            onChange={handleChange}
            placeholder="Ingrese el tipo_vehiculo"
          />
        </Form.Group>

        <Form.Group controlId="kilometraje" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>kilometraje</Form.Label>
          <Form.Control
            type="text"
            name="kilometraje"
            value={form.kilometraje}
            onChange={handleChange}
            placeholder="Ingrese su kilometraje"
          />
        </Form.Group>

        <Form.Group controlId="descripcion" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>descripcion</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Ingrese el correo electrónico"
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

export default FormularioVehiculo;