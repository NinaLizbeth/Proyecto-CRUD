const formulario = document.getElementById("form")

const nombre = document.getElementById("nombre")

const tipo = document.getElementById("tipo")

const raza = document.getElementById("raza")

const agregar = document.getElementById("agregar")

const tabla = document.getElementById('tablabody')

let arregloMascotas = []


agregar.addEventListener("click", (event) => {
    event.preventDefault()
    crearMascota()
})

function crearMascota() {
    const mascota = {
        id: Date.now(),
        nombre: nombre.value,
        tipo: tipo.value,
        raza: raza.value
    }
    arregloMascotas.push(mascota)
guardarEnLS()
    crearFila(mascota)
    borrarFormulario()
    return mascota
}

function obtenerLS() {
    const data = localStorage.getItem('mascotas')
    const dataManipulable = JSON.parse(data)
    if (data) {
        arregloMascotas = dataManipulable
        arregloMascotas.forEach((mascota) => {
    crearFila(mascota)
        })
    } else {
        arregloMascotas = []
    }


}
obtenerLS()

function crearFila (mascota){
    tabla.innerHTML += `
    <tr>
    <td>${mascota.id}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.tipo}</td>
    <td>${mascota.raza}</td>
    <td><button id="editar">EDITAR</button>
    <button onclick="borrarFila('${mascota.id}')" id="eliminar">ELIMINAR</button>
    </td>
    </tr>
    `
}
function borrarFormulario (){
    formulario.reset()
}
function borrarFila (id){
const indice = arregloMascotas.findIndex((m) =>m.id == id )
arregloMascotas.splice(indice, 1)
guardarEnLS()
tabla.innerHTML = ''
obtenerLS()
}
function guardarEnLS (){
    localStorage.setItem('mascotas', JSON.stringify(arregloMascotas))
}


