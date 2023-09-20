import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {
    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll"> {/*h screen overflow es para scrollear hacia abajo y no ocupe mucha pantalla*/}
            
            {pacientes && pacientes.length ? ( //.length devuelve 0 que es false, similar con pacientes
                <> {/*RETORNAMOS UN FRAGMENT CON TODO LO NECESARIO*/}
                    <h2 className="font-black text-3xl mt-12 text-center">
                        Listado Pacientes
                    </h2>
                    <p className="font-medium mt-6 text-lg text-center">
                        Administra tus {""}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>
                    { pacientes.map( paciente => ( //Mapeamos por cada cosa que haya en el array
                        <Paciente           //Y por cada cosa que haya en el array creamos "paciente"
                            key = {paciente.id}    //CUANTO TIENES UN LISTADO Y GENERAS EL COMPONENTE VARIAS VECES DEBES TENER UN KEY UNICO PARA EVITAR ERROR EN CONSOLA
                            //NO SE DEBE USAR EL INDEX COMO KEY PORQUE AFECTA PERFORMANCE porque se pueden agregar más elemntos o eliminarlos
                            //NECESITAMOS UNA KEY UNICA PORQUE SINO REACT RE RENDERIZA TODOS LOS ELEMENTOS EN LUGAR DEL QUE QUIERES
                            //PASAMOS EL OBJETO SOLAMENTE, NO UN ARRAY
                            paciente={paciente} //y a su vez le pasamos este prop con los datos del paciente en el que itera (cada cosa en array manda sus datos)
                            setPaciente={setPaciente}
                            eliminarPaciente={eliminarPaciente}
                        />     //BASICAMENTE TE CREA UN NUEVO ARRAY CON los <Paciente />  necesarios
                        //ADEMAS DE QUE te manda las cosas del mismo index, por ejemplo del 0 -> por lo tanto no es necesario indicarlo
                    ))} 
                </>
             ) : (
             
                <>
                   <h2 className="font-black text-3xl mt-12 text-center">
                        Sin pacientes
                    </h2>
                    <p className="font-medium mt-6 text-lg text-center">
                        Agrega pacientes {""}
                        <span className="text-indigo-600 font-bold">para que aparezcan aqui</span>
                    </p>
                </> 
                
             )}
            
            
            
            {/* COMPROBAMOS SI EL ARRAY QUE SE MANDA TIENE ELEMENTOS O NO PARA MOSTRAR UN MENSAJE U OTRO*/}
           
            
        </div>
    )
}

export default ListadoPacientes