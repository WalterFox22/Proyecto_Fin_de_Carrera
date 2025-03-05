import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";

const FormularioVehiculo = () => {
 
  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .matches(
        /^[A-Za-z\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
    apellido: Yup.string()
      .required("El apellido es obligatorio")
      .matches(
        /^[A-Za-z\s]+$/,
        "El apellido solo puede contener letras y espacios"
      ),
    cuidad: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        "El sector solo puede contener letras y espacios"
      )
      .required("La ciudad es obligatorio"),
    telefono: Yup.string()
      .required("El teléfono es obligatorio")
      .max(10, "El teléfono no debe superar los 10 dígitos")
      .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
    direccion: Yup.string()
      .required("La placa del automóvil es obligatoria")
      .max(7, "La direccion es obligatorio"),
    cedula: Yup.string()
      .required("La cédula es obligatoria")
      .matches(/^\d{10}$/, "La cédula debe tener 10 dígitos")
      .max(10, "La cédula no debe superar los 10 dígitos"),
    email: Yup.string()
      .required("El correo electrónico es obligatorio")
      .email("Correo electrónico inválido"),
    generoConductor: Yup.string().required("El género es obligatorio"),
  });

  const handleSubmit = async (values) => {
    const formDataToSend = new FormData();
    Object.keys(values).forEach((key) => {
      formDataToSend.append(key, values[key]);
    });

    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_URL_BACKEND}/registro/conductores`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(url, formDataToSend, options);

      // Si la respuesta es exitosa
      if (response) {
        toast.success("Conductor registrado con éxito y correo enviado");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const backendResponse = error.response.data;
        if (backendResponse.errors && Array.isArray(backendResponse.errors)) {
          backendResponse.errors.forEach((err) => {
            toast.error(err.msg);
          });
        } else if (backendResponse.msg_registro_conductor) {
          toast.error(backendResponse.msg_registro_conductor);
        } else {
          toast.error(
            "Error desconocido. Por favor, verifica los datos e intenta nuevamente."
          );
        }
      } else {
        toast.error("Error de red. Por favor, intenta nuevamente.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          nombre: "",
          apellido: "",
          cuidad: "",
          direccion: "",
          telefono: "",
          cedula: "",
          email: "",
          fecha_nacimiento: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese el Nombre"
                isInvalid={touched.nombre && errors.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="apellido" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={values.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese el Apellido"
                isInvalid={touched.apellido && errors.apellido}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellido}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="apellido" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>cuidad</Form.Label>
              <Form.Control
                type="text"
                name="cuidad"
                value={values.cuidad}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese la cuidad"
                isInvalid={touched.cuidad && errors.cuidad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellido}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="direccion" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>direccion</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={values.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese la ruta (Ejm: 11)"
                isInvalid={touched.direccion && errors.direccion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.direccion}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="telefono" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese el teléfono"
                isInvalid={touched.telefono && errors.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {errors.telefono}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="cedula" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Cédula</Form.Label>
              <Form.Control
                type="text"
                name="cedula"
                value={values.cedula}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese su cédula (solo 10 dígitos)"
                isInvalid={touched.cedula && errors.cedula}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cedula}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese el correo electrónico"
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>
                fecha_nacimiento
              </Form.Label>
              <Form.Control
                type="text"
                name="fecha_nacimiento"
                value={values.fecha_nacimiento}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese el correo electrónico"
                isInvalid={touched.fecha_nacimiento && errors.fecha_nacimiento}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fecha_nacimiento}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="mx-auto d-block"
              style={{
                width: "200px", // Ajusta según necesites
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px", // Ajustar relleno
              }}
            >
              Registrar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormularioVehiculo;
