import { createContext, useState } from "react";
import axios from 'axios';

const VehiculosContext = createContext()

const VehiculosProvider = ({children})=>{
    const [vehiculos, setVehiculos] = useState([])
    // varible con useState
    const [modal,setModal]=useState(false)
    // para cambiar entre false y true
    const handleModal = () =>{
        setModal(!modal)
    }

    const registrarVehiculos = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_DESPLEGADO}/tratamiento/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.post(url,datos,options)
            setVehiculos([respuesta.data.tratamiento,...vehiculos])
        } catch (error) {
            console.log(error);
        }
    }
    const eliminarVehiculos = async(id) => {
        const token = localStorage.getItem('token')
        try {
            const confirmar = confirm("Vas a eliminar, ¿Estas Seguro?")
            if(confirmar){
                const url = `${import.meta.env.VITE_BACKEND_DESPLEGADO}/tratamiento/${id}`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.delete(url,options)
                // Para filtrar cunado obtner el id que sea distinto para realizar la eliminacion 
                const tratamientosActualizados = vehiculos.filter(t => t._id !== id)
                // Y luego pasar los datos a set vehiculos 
                setVehiculos(tratamientosActualizados)

            }
        } catch (error) {
            console.log(error);
        }
    }
    const cambiarVehiculos = async(id) => {
        const token = localStorage.getItem('token')
        try {
            const confirmar = confirm("Vas a cambiar el estado, ¿Estas Seguro?")
            if(confirmar){
                const url = `${import.meta.env.VITE_BACKEND_DESPLEGADO}/tratamiento/estado/${id}`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url,{},options)
                // Para filtrar cunado obtner el id que sea distinto para realizar la eliminacion 
                const tratamientosActualizados = vehiculos.filter(t => t._id !== id)
                // Y luego pasar los datos a set vehiculos 
                setVehiculos(tratamientosActualizados)

            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <VehiculosContext.Provider value={
            {
                // Contenido del Mensaje
                modal,
                setModal,
                handleModal,
                vehiculos,
                setVehiculos,
                registrarVehiculos,
                eliminarVehiculos,
                cambiarVehiculos
            }
        }>
            {children}
        </VehiculosContext.Provider>
    )
}
export { VehiculosProvider }
export default VehiculosContext 
