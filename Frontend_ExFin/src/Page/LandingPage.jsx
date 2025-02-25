import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const LandingPage =()=>{
    const navigate=useNavigate()
    return(
        <>
        <Button variant="primary" onClick={()=>navigate('/Hola')}>INGRESAR</Button>
        </>
    )
}

export default LandingPage