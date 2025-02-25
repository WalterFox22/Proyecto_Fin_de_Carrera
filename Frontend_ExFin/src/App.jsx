import {Route, Routes} from 'react-router-dom'
import "./App.css";
import LandingPage from './Page/LandingPage';
import Login from './Page/Login';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<LandingPage/>}/>
        <Route path='/Hola' element={<Login/>}/>
        
      </Routes>
    </>
  );
}

export default App;
