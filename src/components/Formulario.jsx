import {useState, useEffect} from 'react';
import Error
 from './error';
const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => { //Usando function expression con arrow, pasamos el props de app.js set pacientes
    const [nombre, setNombre] = useState(''); //Variable, funcion y dentro de use state valor inicial que se asignará a variable
    //Siempre se debe cambiar el valor de variable por medio de función
    //Hooks se colocan en esta parte, antes de return pero dentro de funcion
    //No se deben de colocar dentro de condicionales ni despues de return
    //EL USER STATE PUEDE SER INDIVIDUAL COMO EL ANTERIOR, O :
    const [formulario, setFormulario] = useState({//UN OBJETO CON LOS VALORES, esto solo vive en este componente, props es para pasar variables a otros componentes
        propietario:"", 
        email:"", 
        alta:"", 
        sintomas:""
    }); 

    const [error, setError] = useState(false); //estado inicial false
    
    useEffect(() => { 
        if(Object.keys(paciente).length>0){ //Object.keys returns an array with properties, si no tiene propiedades regresa uno vacio
        //SI LA LONGITUD DEL ARRAY REGRESADO POR OBJECT.KEYS ES MAYOR QUE 0, HAY ALGO (una propiedad y hay un objeto)
            setNombre(paciente.nombre) //Asignamos los valores de paciente a formulario
            setFormulario({propietario:paciente.propietario,email:paciente.email,alta:paciente.alta,sintomas:paciente.sintomas,id:paciente.id}) //AGREGAMOS ID AL FORMULARIO, DE ESTA MANERA SABEMOS DIFERENCIAR DE UNO EDITADO A UNO NUEVO
        } else {
        //SI LA LONGITUD DEL ARRAY REGRESADO POR OBJECT.KEYS ES IGUAL QUE 0, object.keys retorna un array solo, no hay nada
        
        }
    }, [paciente]) //En estos corchetes va el state que quieres renderizar cuando cambie paciente 

   
    const generarID = () => {
        const random = Math.random().toString(36).substring(2); 
        const fecha = Date.now().toString(36); //Creamos 2 numeros aleatorios y los sumamos para darle un ID unico a la lista
        return random + fecha;
    }

    const handleSubmit = (e) => { //Si son varias lineas se recomienda hacer funcion arriba y mandarla llamar en el evento
        e.preventDefault();       //El evento se detiene
        //if([nombre, propietario, email, alta, sintomas].includes('')){ //Verificamos que el array no tenga un valor vacio ESTO SE HACE SI FUERAN MUCHOS USE STATE INDIVIDUALES
        //RECORDAR QUE formulario es UN OBJETO, hay que convertirlo a array
        if ([nombre,formulario.propietario,formulario.email,formulario.alta,formulario.sintomas].includes('')){ //Creamos el array con los 4 valores del objeto y el valor de la variable
            //includes es para arrays y string, por eso hay que crear array con los valores de las variables y objetos en state
            setError(true); //Puedes hacerlo tmb con return
            //PODRIA CREAR UN NUEVO OBJETO Y AÑADIRLE NOMBRE TAMBIÉN Y SOLAMENTE USAR ESE NUEVO OBJETO en el if y en set pacientes
        } else {
            setError(false);
             //MANDAMOS NOMBRE AL PADRE POR MEDIO DE ESTE PROP(FUNCION) PARA ASIGNARLO A PACIENTES
            //ASIGNAMOS ID CON EL VALOR DANDOM QUE RETORNA LA FUNCION GENERAR ID
            //AÑADIMOS NOMBRE Y ID AL OBJETO QUE SE CREA EN FORMULARIO
            //setPacientes es la funcion de App,js que le asigna el valor a pacientes
            //...pacientes copia/vuelve a asignar el mismo objeto
            //Pero para que los objetos en pacientes no se borren, tmb lo regresamos y lo volvemos a asignar
            //ahora incluyendo el nuevo objeto
            //Basicamente regresamos un array de objetos, que incluye el mismo array (objetos que ya tenia) más el nuevo que se agrega
            //Hay que agregar lo que ya se tenia en arrays y objetos cuando usas useState porque sino se borra 
            //Recuerda que no hay que mutar los arrays y objetos en react, por ejemplo no se usa push. Es mejor usar spread y asginar el valor con la funcion
            if (paciente.id){ //BASICAMENTE SI TIENE UN ID ACTUALIZALO
                
                //RECUERDA QUE .MAP ITERA POR TODOS LOS VALORES Y REGRESA TODOS, PERO PUEDES MODIFICAR LOS QUE CUMPLAN LA CONDICION 
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ?   //Checa que en el array de pacientes y en paciente sea el mismo id
                    {nombre:nombre, propietario:formulario.propietario, email:formulario.email, alta:formulario.alta, sintomas:formulario.sintomas, id:paciente.id} :      //Si el id coincide, retorno esto y modifico el objeto que coincide en el array. LOS DEMÁS NO SE MODIFICAN 
                    //ESTE VALOR QUE RETORNO ES EL QUE ESTA EN EL FOMRULARIO, ES DECIR, EL QUE YA SE ACTUALIZO Y SE SUSTITUYE CON EL QUE NO ESTA ACTUALIZADO
                    pacienteState               //Si es false, retorna el valor que no se debe modificar. Es decir, el que no coincide con el id. O sea que los demás objetos en el array no se modifican si no cumplen con el id
                    )                           //AL FINAL TE REGRESA UN NUEVO ARRAY 
                setPacientes(pacientesActualizados)//ASIGNAMOS EL NUEVO ARRAY CREADO CON .MAP A SET PACIENTES CON EL VALOR ACTUALIZADO
                setPaciente({})   //CUANDO YA HAGAMOS EL CAMBIO, BORRAMOS LO QUE HAY EN EL STATE PACIENTE, YA QUE SE HA ACTUALIZADO
            } else {
                setPacientes([...pacientes, {nombre,...formulario, id: generarID()}]) //SI NO TIENE UN ID CREA UNO NUEVO
            }
            setNombre("")
            setFormulario({propietario:"", email:"", alta:"", sintomas:""}) //limpiamos valores
            //Cuando usas setState basicamente hay que volver a asignar todos los valores del array
        }
    }


    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl mt-12 text-center">
                Seguimiento Pacientes
            </h2>
            <p className="font-medium mt-6 text-lg text-center">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form 
                className="bg-white rounded-lg border-slate-500 shadow-md mt-6 py-10 px-5"
                onSubmit={handleSubmit} //Cuando le das a submit, que es con el input tipo submit, manda llamar la funcion handleSubmit
            >
            <Error 
                error={error} //mandamos props de error a Error.jsx para activar o desactivarlo, en este caso, mensaje de error
                mensaje={"Todos los campos son obligatorios"} //y también mensaje de error que queremos que se muestre
                //Se puede pasar "children" de otra manera: <error>hola paso esto como children<error/>, pongo children como prop en el hijo y uso eso, basicamente lo que este en medio
                //es lo que se va a pasar como el prop "childred", usando esa palabra. ES MEJOR USAR CHILDREN CUANDO USARÁS O PASARAS MUCHO  HTML
            />
                <div className="mb-5">
                    <label htmlFor="mascota" className="uppercase font-bold block text-gray-700">
                        Nombre Mascota 
                    </label>
                    <input 
                        id="mascota"
                        type="text" 
                        placeholder="Nombre de la mascota" 
                        className="border-2 rounded-lg border-gray-300 w-full p-2 mt-2 placeholder-gray-400"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value)} //Cuando cambia el input has este codigo
                                            //target retorna el objeto e, con la proiedad target que es el elemento que envia el evento, en este caso el input y su valor
                                            //ONCHANGE es de html, pero capturas ese evento con la funcion
                                            //setNombre asigna el valor a la variable nombre, en este caso, el que tiene input
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="uppercase font-bold block text-gray-700">
                        Nombre Propietario 
                    </label>
                    <input
                        id="propietario" 
                        type="text"
                        placeholder="Nombre del propietario" 
                        className="border-2 rounded-lg border-gray-300 w-full p-2 mt-2 placeholder-gray-400"
                        value={formulario.propietario} //EL OBJETO que creamos anteriormente
                        onChange = { (e) => setFormulario({...formulario, propietario: e.target.value })} //Usamos ... spread para que la otra data se vuelva a copiar en el objeto. Sin spread se pierden los otros valores
                        //Y ASIGNAMOS A PROPIETARIO EL VALOR QUE SE PONE EN EL INPUT
                        //BASICAMENTE, ASIGNAMOS NUEVAMENTE LOS VALORES QUE YA TENIA FORMULARIO, Y LUEGO LE ASIGNAMOS EL VALOR A PROPIETARIO CON PROPIETARIO
                        //Como tenemos un objeto, tenemos que regresar un objeto. Y para que no se pierdan los valores usamos ... spread para volver a asignar el mismo objeto
                        //... spread basicamente te vuelve a poner/copiar todo el mismo array
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="uppercase font-bold block text-gray-700">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        className="border-2 rounded-lg border-gray-300 w-full p-2 mt-2 placeholder-gray-400"
                        placeholder="Ingresa tu email"
                        value={formulario.email}
                        onChange = {(e) => setFormulario({...formulario, email:e.target.value})}
                    />
                </div>
                <div className="mb-5">
                    <label className="uppercase font-bold block text-gray-700">
                        Alta
                    </label>
                    <input 
                        type="date" 
                        className="border-2 rounded-lg border-gray-300 w-full p-2 mt-2 placeholder-gray-400"
                        value={formulario.alta}
                        onChange= {(e) => setFormulario({...formulario, alta:e.target.value})}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="uppercase font-bold block text-gray-700">
                        Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        type="text"
                        placeholder="Escribe los sintomas que tienes"
                        className="border-2 rounded-lg border-gray-300 w-full p-2 mt-2 placeholder-gray-400"
                        value={formulario.sintomas}
                        onChange= {(e) => setFormulario({...formulario, sintomas:e.target.value})}
                    />
                </div>
                <input 
                    type="submit" 
                    className="bg-indigo-600 text-zinc-100 w-full p-3 uppercase font-bold
                    hover:bg-indigo-800 cursor-pointer first-letter transition-all" 
                    value={!formulario.id ? "AGREGAR PACIENTE" : "EDITAR PACIENTE"}
                />
            </form>
        </div>
    )
}

export default Formulario 