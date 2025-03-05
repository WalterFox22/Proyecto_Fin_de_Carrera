import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormularioClientes = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});

  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    cedula: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    fecha_nacimiento: null,
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().trim().required("Nombre es requerido"),
    apellido: Yup.string().trim().required("Apellido es requerido"),
    email: Yup.string().trim().email("Email inválido").required("Email es requerido"),
    cedula: Yup.string().trim().matches(/^\d{10}$/, "Cédula debe tener 10 dígitos").required("Cédula es requerida"),
    direccion: Yup.string().trim().required("Dirección es requerida"),
    ciudad: Yup.string().trim().required("Ciudad es requerida"),
    telefono: Yup.string().trim().required("Teléfono es requerido"),
    fecha_nacimiento: Yup.date().nullable().required("Fecha de nacimiento es requerida"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_DESPLEGADO}/cliente/registerClientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(url, values, options);
      setMensaje({ respuesta: "Cliente registrado con éxito", tipo: true });
    } catch (error) {
      console.error("Error al actualizar:", error.response?.data);
      setMensaje({ respuesta: error.response?.data?.msg || "Error desconocido", tipo: false });
      setTimeout(() => setMensaje({}), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Nombre</Form.Label>
              <Field
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Ingrese el Nombre"
              />
              <ErrorMessage name="nombre" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="apellido" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Apellido</Form.Label>
              <Field
                type="text"
                name="apellido"
                className="form-control"
                placeholder="Ingrese el Apellido"
              />
              <ErrorMessage name="apellido" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="direccion" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Direccion</Form.Label>
              <Field
                type="text"
                name="direccion"
                className="form-control"
                placeholder="Ingrese la direccion Ejmp: Cotocollao"
              />
              <ErrorMessage name="direccion" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="ciudad" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Ciudad</Form.Label>
              <Field
                type="text"
                name="ciudad"
                className="form-control"
                placeholder="Ingrese la ciudad Ejmp: Cotocollao"
              />
              <ErrorMessage name="ciudad" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="telefono" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Teléfono</Form.Label>
              <Field
                type="text"
                name="telefono"
                className="form-control"
                placeholder="Ingrese el teléfono"
              />
              <ErrorMessage name="telefono" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="cedula" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Cédula</Form.Label>
              <Field
                type="text"
                name="cedula"
                className="form-control"
                placeholder="Ingrese su cédula (solo 10 dígitos)"
              />
              <ErrorMessage name="cedula" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Ingrese el correo electrónico"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="fecha_nacimiento" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Fecha de Nacimiento</Form.Label>
              <DatePicker
                selected={(initialValues.fecha_nacimiento && new Date(initialValues.fecha_nacimiento)) || null}
                onChange={(date) => setFieldValue("fecha_nacimiento", date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
                placeholderText="Seleccione la fecha de nacimiento"
              />
              <ErrorMessage name="fecha_nacimiento" component="div" className="text-danger" />
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
              disabled={isSubmitting}
            >
              Registrar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormularioClientes;