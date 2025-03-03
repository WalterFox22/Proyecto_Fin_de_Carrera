import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import { AuthProvider } from "./Context/AuthProvider";
import Auth from "./Layout/Auth";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/" element={<Auth />}>
              <Route path="login" element={<Login />} />
            </Route>

            <Route path="dashboard/*" element={
              <Routes>
                <Route />
              </Routes>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
