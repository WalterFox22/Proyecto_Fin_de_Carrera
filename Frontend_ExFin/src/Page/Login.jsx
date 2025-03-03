import { useState } from "react";
import "../Styles/LoginStyle.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  return (
    <div id="login-body">
        {/* Icono para volver atrás */}
        <BsArrowLeftSquareFill
            className="back-icon"
            onClick={() => navigate('/')}
        />
      <div id="login-glass-container">
        <div id="login-box">
          <h2 id="login-title">LOGIN</h2>
          <form id="login-form" /*onSubmit={handleSubmit}*/>
            <input
              id="login-email"
              type="email"
              name="email"
              //value={form.email}
              //onChange={handleChange}
              required
              placeholder="Correo"
            />
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"} // Alternar entre texto y password
                name="password"
                //value={form.password}
                //onChange={handleChange}
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
  );
};

export default Login;
