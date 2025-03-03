import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({}); // Objeto vacio para inicializar

  const Perfil = async (token) => {


  };


  // Verifica el token y carga el perfil al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Perfil(token);
    }
  }, []);


  return(
    <AuthContext.Provider value={{
        auth,
        setAuth
    }}>
        {children}
    </AuthContext.Provider>
  )
};


export {AuthProvider}
export default AuthContext