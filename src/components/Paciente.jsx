const Paciente = ({paciente, setPaciente,eliminarPaciente}) => {
    
    const handleEliminar = () => {
        const respuesta = confirm ("Deseas eliminar este paciente?"); //preguntamos si se desea eliminar, si es true se elimina
        if (respuesta) {
            eliminarPaciente(paciente.id)/*Regresamos el id a APP .js para poderlo eliminar, es necesario tomar el id desde aqui para seleccionar el paciente correcto*/
        }
    }
    
    return (
        <div className="bg-white rounded-lg border-slate-500 shadow-md my-6 mx-5 py-10 px-5">
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre: {""}
                <span className="normal-case font-normal">{paciente.nombre /* No es necesario poner el index del array, porque te lo mapea el .map PASAMOS OBJETO NO UN ARRAY*/}</span> 
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Propietario: {""}
                <span className="normal-case font-normal">{paciente.propietario}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Email: {""}
                <span className="normal-case font-normal">{paciente.email}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Fecha de alta: {""}
                <span className="normal-case font-normal">{paciente.alta}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Sintomas: {""}
                <span className="normal-case font-normal">{paciente.sintomas}</span>
            </p>
            <div className= "flex justify-between mt-10">
                <button 
                    type="button" 
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700
                     text-white font-bold uppercase rounded-lg"
                     onClick={() => setPaciente(paciente) /*No spread porque es un solo objeto, si no usas funcion lo hace automaticamente y no se espera a dar click */}> 
                        {/* SI USAS ARGUMENTOS EN LA FUNCION ES UN CALLBACK Y MANDA LLAMAR LA FUNCION AUTOMATICAMENTE, si no usas lo puedes poner solo como setPaciente */}
                    Editar
                </button>
                <button 
                    type="button" 
                    className="py-2 px-10 bg-red-700 hover:bg-red-800 text-white
                     font-bold uppercase rounded-lg"
                     onClick={handleEliminar /* llamamos la funcion handleEliminar */}>  
                    Eliminar 
                </button>
            </div>
        </div>
    )
}

export default Paciente