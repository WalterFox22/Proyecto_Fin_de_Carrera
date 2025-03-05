import React from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormularioVehiculo = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    marca: Yup.string().required("La marca es obligatoria"),
    modelo: Yup.string().required("El modelo es obligatorio"),
    anio_fabricacion: Yup.string().required("El año de fabricación es obligatorio"),
    placa: Yup.string().required("La placa es obligatoria"),
    color: Yup.string().required("El color es obligatorio"),
    tipo_vehiculo: Yup.string().required("El tipo de vehículo es obligatorio"),
    kilometraje: Yup.string().required("El kilometraje es obligatorio"),
    descripcion: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      marca: "",
      modelo: "",
      anio_fabricacion: "",
      placa: "",
      color: "",
      tipo_vehiculo: "",
      kilometraje: "",
      descripcion: "",
    },
    validationSchema,
    onSubmit: async (values) => {
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

        await axios.post(url, values, options);
        toast.success("Vehículo registrado con éxito");
        navigate("/ruta-deseada"); // Cambia "/ruta-deseada" por la ruta a la que deseas navegar después del registro
      } catch (error) {
        console.error("Error al registrar el vehículo:", error.response?.data);
        toast.error(error.response?.data?.msg || "Error desconocido");
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="marca" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Marca</Form.Label>
          <Form.Control
            type="text"
            name="marca"
            value={formik.values.marca}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese la marca"
            isInvalid={formik.touched.marca && formik.errors.marca}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.marca}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="anio_fabricacion" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Año de Fabricación</Form.Label>
          <Form.Control
            type="text"
            name="anio_fabricacion"
            value={formik.values.anio_fabricacion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese el año de fabricación"
            isInvalid={formik.touched.anio_fabricacion && formik.errors.anio_fabricacion}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.anio_fabricacion}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="modelo" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Modelo</Form.Label>
          <Form.Control
            type="text"
            name="modelo"
            value={formik.values.modelo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese el modelo"
            isInvalid={formik.touched.modelo && formik.errors.modelo}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.modelo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="placa" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Placa</Form.Label>
          <Form.Control
            type="text"
            name="placa"
            value={formik.values.placa}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese la placa"
            isInvalid={formik.touched.placa && formik.errors.placa}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.placa}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="color" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese el color"
            isInvalid={formik.touched.color && formik.errors.color}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.color}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="tipo_vehiculo" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Tipo de Vehículo</Form.Label>
          <Form.Control
            type="text"
            name="tipo_vehiculo"
            value={formik.values.tipo_vehiculo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese el tipo de vehículo"
            isInvalid={formik.touched.tipo_vehiculo && formik.errors.tipo_vehiculo}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.tipo_vehiculo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="kilometraje" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Kilometraje</Form.Label>
          <Form.Control
            type="text"
            name="kilometraje"
            value={formik.values.kilometraje}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese el kilometraje"
            isInvalid={formik.touched.kilometraje && formik.errors.kilometraje}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.kilometraje}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="descripcion" className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese la descripción"
            isInvalid={formik.touched.descripcion && formik.errors.descripcion}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.descripcion}
          </Form.Control.Feedback>
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