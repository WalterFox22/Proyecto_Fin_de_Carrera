import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const VerVehiculo= ()=>{
  const { auth } = useContext(AuthContext)

    const navigate = useNavigate()

    const [reservas, setlistar] = useState([])

    const listarPacientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_DESPLEGADO}/reserva/listReserva`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setlistar(respuesta.data, ...reservas)
        } catch (error) {
            console.log(error);
        }
    }
    
    // Para que se ejecute una sola vez
    useEffect(() => {
      listarPacientes()
  }, [])
  return(
    <>
    
            {
                reservas.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Propietario</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Celular</th>
                                <th className='p-2'>Estado</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pacientes.map((paciente, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={paciente._id}>
                                        <td>{index + 1}</td>
                                        <td>{reservas.nombre}</td>
                                        <td>{reservas.modelo}</td>
                                        <td>{reservas.email}</td>
                                        <td>{reservas.celular}</td>
                                        <td>
                                            <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{paciente.estado && "activo"}</span>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd 
                                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                                // Vizualizar los detalles del registro del paciente en "vizualizar"
                                                onClick={() => navigate(`/dashboard/visualizar/${paciente._id}`)}
                                            />
                                            {
                                                auth.rol === "veterinario" &&
                                                (
                                                    <>
                                                    <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                                    onClick={() => navigate(`/dashboard/actualizar/${paciente._id}`)} 
                                                    />
                                        
                                                    <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" 
                                                    onClick={() => { handleDelete(paciente._id) }}
                                                    />
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        
    </>
  )
}

export default VerVehiculo