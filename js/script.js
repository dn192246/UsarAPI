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
                        <button onclick="eliminarItem(${persona.id})">Eliminar</button>
                    </td>
            </tr>
        `;
    });

}

ObtenerPersonas();




//Agregar Registros
const modal = document.getElementById('modal-agregar');
const btnAbrir = document.getElementById('btnAbrirModal');
const btnCerrar = document.getElementById('btnCerrarModal');

btnAbrir.addEventListener('click', () => {
    modal.showModal();
});

btnCerrar.addEventListener('click', () => {
    modal.close();
});

document.getElementById('frmAgregar').addEventListener('submit', async e =>{
    e.preventDefault(); //Evita que el formulario se envíe sin hacer las validaciones

    //Capturar los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const correo = document.getElementById('correo').value.trim();

    // Validación básica
    if (!nombre || !apellido || !correo) {
        alert('Por favor completa todos los campos.');
        return;
    }

    // Crear el nuevo usuario
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, correo, edad: 21 })
    });

    if (respuesta.ok) {
        
        // Limpiar formulario y cerrar modal
        document.getElementById('frmAgregar').reset();
        modal.close();

        // Recargar la tabla
        ObtenerPersonas();

        alert("El registro fue agregado correctamente");
    }
    else{
        alert("Hubo un error al agregar el registro. Error: " + res.status)
    }

})//Aquí termina la función


//Para Eliminar Items
async function eliminarItem(id) {
    if (confirm('¿Seguro que quieres eliminar este item?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        ObtenerPersonas();
    }
}