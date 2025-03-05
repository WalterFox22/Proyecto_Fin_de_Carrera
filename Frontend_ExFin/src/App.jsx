import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import { AuthProvider } from "./Context/AuthProvider";
import Auth from "./Layout/Auth";
import Dashboard from "./Layout/Dashboard";
import Pedidos from "./Page/Pedidos";
import Productos from "./Page/Productos";
import Clientes from "./Page/Clientes";
import { PrivateRoute } from "./Routes/PrivateRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<LandingPage />} />

            <Route path="/" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="prueba" element={<Dashboard />} />
            </Route>

            <Route
              path="dashboard/*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Productos />} />
                      <Route path="clientes" element={<Clientes />} />
                      <Route path="pedidos" element={<Pedidos />} />
                    </Route>
                  </Routes>
                </PrivateRoute>
              }
            />
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
