import { useContext, useState } from "react";
import "../Styles/LoginStyle.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import AuthContext from "../Context/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  // Paso 1
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // Paso 2

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Paso 3
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
    try {
      const respuesta = await axios.post(url, form);

      localStorage.setItem("token", respuesta.data.token);

      localStorage.setItem("rol", respuesta.data.rol); //// setea el rol al momento deingresar

      setAuth(respuesta.data);
      console.log(respuesta);
      toast.success(respuesta.data.msg); // Mostrar mensaje de éxito
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="login-body">
        {/* Icono para volver atrás */}
        <BsArrowLeftSquareFill
          className="back-icon"
          onClick={() => navigate("/")}
        />
        <div id="login-glass-container">
          <div id="login-box">
            <h2 id="login-title">LOGIN</h2>
            <form id="login-form" onSubmit={handleSubmit}>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Correo"
              />
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"} // Alternar entre texto y password
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Contraseña"
                  style={{
                    paddingRight: "35px", // Espacio para el ícono
                    width: "100%", // Asegura que el campo tenga el tamaño completo
                  }}
                />
                {/* Ícono de ojo */}
                <span
                  onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad
                  style={{
                    position: "absolute",
                    right: "10px", // Alinea el ícono a la derecha
                    top: "62%",
                    transform: "translateY(-50%)", // Centra el ícono verticalmente
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "white", // Color blanco para el ícono
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                  {/* Alterna entre los íconos */}
                </span>
              </div>

              <div id="login-options">
                <Link to="/recuperacion/contrasenia" id="login-forgot-password">
                  Olvidaste tu contraseña?
                </Link>
              </div>

              <button id="login-button" className="btn btn-success">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
