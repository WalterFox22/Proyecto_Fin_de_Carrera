import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import { AuthProvider } from "./Context/AuthProvider";
import Auth from "./Layout/Auth";
import Dashboard from "./Layout/Dashboard";
import Clientes from "./Page/Clientes";
import { PrivateRoute } from "./Routes/PrivateRoutes";
import Vehiculo from "./Page/Vehiculos";
import Perfil from "./Page/Perfil";
import Reservas from "./Page/Reservas";
import ListarReservas from "./Page/ListaReserva";
import ListarVehiculo from "./Page/ListarVehiculos";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<Login />} />
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
                    <Route index element={<Perfil />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path="vehiculos" element={<Vehiculo />} />
                    <Route path="reservas" element={<Reservas />} />
                    <Route path="listar-vehiculos" element={<ListarVehiculo />} />
                    <Route path="listar-reservas" element={<ListarReservas />} />


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
