import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const LandingPage =()=>{
    const navigate=useNavigate()
    return(
        <>
        <h1>hadbjcvhshgcs</h1>
        <Button variant="primary" onClick={()=>navigate('/Hola')}>INGRESAR</Button>
        </>
    )
}

export default LandingPage