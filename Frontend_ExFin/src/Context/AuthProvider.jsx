import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({}); // Objeto vacio para inicializar

  const Perfil = async (token) => {
    console.warn(localStorage.getItem("rol"));

    try {
      const urlV = `${import.meta.env.VITE_BACKEND_URL}/perfil`;
      // Configuración de las cabeceras para la solicitud
      const options = {
        headers: {
          "Content-Type": "application/json", // Corregido: "Content Type" -> "Content-Type"
          Authorization: `Bearer ${token}`, // Asegúrate de incluir un espacio después de "Bearer"
        },
      };

      const respuesta = await axios.get(urlV, options);
      console.log(respuesta);
      setAuth(respuesta.data); // Almacena los datos del perfil en el estado
    } catch (error) {
      console.error(
        "Error al obtener el perfil:",
        error.response?.data || error.message
      );
    }
  };

  // Verifica el token y carga el perfil al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Perfil(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
