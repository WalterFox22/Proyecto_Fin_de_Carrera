import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/Hola" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
