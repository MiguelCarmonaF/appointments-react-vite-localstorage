const Error = ({error,mensaje}) => {
    
    return (
        <div>
              { error && ( //Evalua expresion y si es true regresa un div, validamos en el front y no mandamos nada hasta que cumpla condicion
                    <div className="bg-red-700 text-white text-center p-3 font-bold uppercase mb-3 rounded-md">
                        <p>{mensaje}</p>
                    </div>
                ) /*error ? "Si hay un error" : "No hay error" Validamos con el terniario la condicion del handle submit*/} 
                {/* APARECE MENSAJE HASTA QUE HAY UN ERROR Y RETORNAMOS UN DIV*/}
        </div>
    )
}

export default Error;