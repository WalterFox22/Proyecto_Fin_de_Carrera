import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const FormularioClientes = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    cedula: "",
    direccion: "",
    ciudad:"",
    telefono: "",
    fecha_nacimiento: null,
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
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim(),
      cedula: form.cedula.trim(),
      direccion: form.direccion.trim(),
      ciudad:form.ciudad.trim(),
      telefono: form.telefono.trim(),
    };

    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_DESPLEGADO}/cliente/registerClientes`;
      const options = {
        headers: {
          method: 'POST',
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(url, cleanedForm, options);
      setMensaje({ respuesta: "Cliente registrado con éxito", tipo: true });
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
        <Form.Group controlId="nombre" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ingrese el Nombre"
          />
        </Form.Group>

        <Form.Group controlId="apellido" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Ingrese el Apellido"
          />
        </Form.Group>

        <Form.Group controlId="direccion" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Direccion</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Ingrese la direccion Ejmp: Cotocollao"
          />
        </Form.Group>

        <Form.Group controlId="ciudad" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="ciudad"
            value={form.ciudad}
            onChange={handleChange}
            placeholder="Ingrese la direccion Ejmp: Cotocollao"
          />
        </Form.Group>

        <Form.Group controlId="telefono" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ingrese el teléfono"
          />
        </Form.Group>

        <Form.Group controlId="cedula" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Cédula</Form.Label>
          <Form.Control
            type="text"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Ingrese su cédula (solo 10 dígitos)"
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ingrese el correo electrónico"
          />
        </Form.Group>

        <Form.Group controlId="fecha_nacimiento" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>
            Fecha de Nacimiento
          </Form.Label>
          <DatePicker
            selected={form.fecha_nacimiento}
            onChange={(date) => setForm({ ...form, fecha_nacimiento: date })}
            dateFormat="yyyy/MM/dd"
            className="form-control"
            placeholderText="Seleccione la fecha de nacimiento"
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

export default FormularioClientes;