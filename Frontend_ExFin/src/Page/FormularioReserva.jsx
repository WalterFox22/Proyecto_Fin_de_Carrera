import React from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormularioReserva = () => {
  const navigate = useNavigate();

  const initialValues = {
    codigo: "",
    descripcion: "",
    cliente: "",
    vehiculo: "",
  };

  const validationSchema = Yup.object({
    codigo: Yup.string().required("El código es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    cliente: Yup.string().required("El cliente es obligatorio"),
    vehiculo: Yup.string().required("El vehículo es obligatorio"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://backend-exfinal.onrender.com/api/vehiculo/registroVehiculo`;
      const options = {
        headers: {
          method: 'POST',
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(url, values, options);
      toast.success("Vehículo registrado con éxito");
      navigate("/ruta-deseada"); // Cambia "/ruta-deseada" por la ruta a la que quieres redirigir
    } catch (error) {
      console.error("Error al registrar:", error.response?.data);
      toast.error(error.response?.data?.msg || "Error desconocido");
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
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="codigo" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Código</Form.Label>
              <Field
                type="text"
                name="codigo"
                className="form-control"
                placeholder="Ingrese el código"
              />
              <ErrorMessage name="codigo" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="descripcion" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Descripción</Form.Label>
              <Field
                type="text"
                name="descripcion"
                className="form-control"
                placeholder="Ingrese la descripción"
              />
              <ErrorMessage name="descripcion" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="cliente" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Cliente</Form.Label>
              <Field
                type="text"
                name="cliente"
                className="form-control"
                placeholder="Ingrese el cliente"
              />
              <ErrorMessage name="cliente" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group controlId="vehiculo" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Vehículo</Form.Label>
              <Field
                type="text"
                name="vehiculo"
                className="form-control"
                placeholder="Ingrese el vehículo"
              />
              <ErrorMessage name="vehiculo" component="div" className="text-danger" />
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

export default FormularioReserva;