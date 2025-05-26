
//URL de la API - enpoint
const API_URL = "https://retoolapi.dev/39xMC5/expo";

//Funcion para llamar a la APi y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos la repsuesta del servidor 
    const res = await fetch(API_URL); //Obtener datos de la API

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json(); //esto es un JSON

    CrearTabla(data); //Enviamos el JSON a la función "CrearTabla".

}


//Funcion que creara las filas de las tablas en base a los registros que vienne de la API

function CrearTabla(datos){ //"Datos" representa al JSON que viene de la API
    //Se llama al "tbody" dentro de la tabla id "tabla"

    const tabla = document.querySelector("#tabla tbody");

    //inner HTML es para inyectar código HTML desde JS
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido}</td>
                    <td>${persona.edad}</td>
                    <td>${persona.correo}</td>
                    <td> 
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
            </tr>
        `;
    });

}

ObtenerPersonas();