import Header from "./components/Header"; //Importamos el componente de Header
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";
import {useState, useEffect} from 'react'

function App() {
  //AQUI FUERA DEL RETURN ES CODIGO JS NORMAL, funciones, ifs, validaciones, etc. 
  //reviscamos en set pacientes si hay un valor en local storage y se lo asignamos, si no hay valor le asignamos el array vacio
  //lo mandamos llamar con el key que asignamos anteriormente
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []) //LOS PROPS SON PARA PASAR VARIABLES DE UN COMPONENTE A OTRO
  const [paciente, setPaciente] = useState({})
  //PROPS SOLO PASAN DE PADRES A HIJOS, REUTILIZAR VARIABLES
  //Puedes pasar variables o funciones, arrays, booleans, etc.
  //Si se pasa a diferentes componentes es mejor colocarlo en el principal, en este caso se pasa a formulario y paciente
  //Puedes pasar valores de hijo a padre por medio de una funcion (funcion manda de padre al hijo y el hijo la regresa con una variable como argumento)
  const eliminarPaciente = id => {
    const pacienteEliminado = pacientes.filter(eliminar => eliminar.id!==id) //FILTER SOLO VA A RETORNAR UN ARRAY CON TODOS LOS ELEMENTOS QUE NO COINCIDAN CON EL ID, ES DECIR, BORRA EL QUE TIENE EL ID
    setPacientes(pacienteEliminado);
  }

  useEffect ( () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes)); //convertimos el arreglo a string con json, y lo guardamos en local storage
    //cada que se actualice el componente pacientes, lo vuelve a convertir a json. 
    //asignamos "key" y su valor con el set item
  },[pacientes])

  return (
   <div className="container mx-auto mt-20"> {/* En HTML se usa class, en jsx className porque class es reservada*/}
      {/* <></> Fragment, solo puedes retornar un elemento, que es este fragment que contiene lo demás, o puede ser un div*/}
      {/* Aqui no puedes colocar funciones ni ifs, y es lo que se muestra en pantalla en el return*/}
      {/* Debes cerrar bien las etiquetas o te marca error*/}
      {/* Puedes colocar expresiones, ternarios, metodos para string, etc.*/}
      { /* 1+1 ESTO ES CODIGO JS, lo suma y muestra en pantalla. Todo dentro de llaves es JS*/}
      {/*edad >= 19 ? "eres mayor de edad":"No eres mayor de edad"*/}
      <h1>{/* "Hola Mundo ".toLowerCase()+edad */} </h1>
    
      <Header 
        numeros = {1 /* Esto es un prop , se pasan por los componentes*/} 
      />  {/*componentes siguen esta sintaxys*/}
      <div className="md:flex mt-12">
        <Formulario 
          pacientes={pacientes}//y tambien regreso los pacientes ya guardados para que no se eliminen
          setPacientes={setPacientes} //Pasamos la funcion setPacientes a formulario   
          paciente = {paciente}
          setPaciente = {setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
   
    </div>
  )
}

export default App
