const  formulario = document.getElementById("form")

const nombre = document.getElementById("nombre")

const tipo = document.getElementById("tipo")

const  raza = document.getElementById("raza")

const agregar = document.getElementById("agregar")

const  tabla = document.getElementById('tablabody')

let arregloMascotas = []


agregar.addEventListener("click", (event) => {
    event.preventDefault()
const mascota = crearMascota()
console.log(mascota)
} )

function crearMascota (){
    const mascota = {
        id: Date.now(),
        nombre:  nombre.value,
        tipo: tipo.value,
        raza: raza.value
    }
    arregloMascotas.push(mascota)
    localStorage.setItem('mascotas', JSON.stringify(arregloMascotas))
    return mascota
}      

function  obtenerLS  (){
    const data = localStorage.getItem('mascotas')
    const dataManipulable = JSON.parse(data) 
    if(data){
        arregloMascotas = dataManipulable
    } else {
        arregloMascotas = []
    }
    tabla.innerHTML =  ''
    arregloMascotas.forEach((mascota) => {
        tabla.appendChild(`
        <tr>
        <td>${mascota.id}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.tipo}</td>
        <td>${mascota.raza}</td>
        <td><button id="editar">EDITAR</button>
        <button id="eliminar">ELIMINAR</button>
        </td>
        </tr>
        `)
    })
    
}
obtenerLS()


