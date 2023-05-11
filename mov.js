// Agrego los elementos html por medio de su id
const formulario = document.getElementById("form")

const nombre = document.getElementById("nombre")

const tipo = document.getElementById("tipo")

const raza = document.getElementById("raza")

const agregar = document.getElementById("agregar")

const tabla = document.getElementById('tablabody')

const actualizar = document.getElementById("actualizar")

// utilizo array vacio para  luego ir agregando las mascotas
let arregloMascotas = []
//  se iguala a null porque en el estado inicial no se esta editando ninguna  mascota
let idmascotaEdit = null

// Agrego evento click para que cuando haga click en el boton agregar  se llame a la funcion  crear mascota
// Con event.preventDefault evitamos que la pagina se recargue
agregar.addEventListener("click", (event) => {
    event.preventDefault()
    crearMascota()
})

//  Se crea  la funcion mascotas con un objeto que contiene  un id unico gracias a la funcion date.now() y ademas se agregan los valores del formulario (nombre, tipo, raza) con .value
function crearMascota() {
    const mascota = {
        id: Date.now(),
        nombre: nombre.value,
        tipo: tipo.value,
        raza: raza.value
    }
    // guardo el objeto mascota dentro de mi array de mascotas y le aplico el metodo push para agregarla al arreglo.
    arregloMascotas.push(mascota)
    // Llamo a la funcion guardarEnLS() para agregarla al localStorage.
guardarEnLS()
// con esta funcion se agregara una nueva fila con los datos del objeto mascota
    crearFila(mascota)
    // utilizo esta funcion para resetear el formulario una vez ingresado los datos
    borrarFormulario()
    return mascota
}

// Aqui se crea la funcion obtenerLS para traer el arreglo de mascotas desde el LorageStorage
// JSON.parse convierte el texto plano en  un arreglo manipulable
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
// Aqui se llama a la funcion obtenerLs
obtenerLS()

// Aqui se crea  la funcion crearFila mencionada arriba para agregara una nueva fila con los datos del objeto mascota  utilizo tabla.innerHTML para agregar una nueva fila a la constante tabla ("tablabody")
function crearFila (mascota){
    tabla.innerHTML += `
    <tr>
    <td>${mascota.id}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.tipo}</td>
    <td>${mascota.raza}</td>
    <td>
    <button onclick="editarFila('${mascota.id}')" id="editar">EDITAR</button>
    <button onclick="borrarFila('${mascota.id}')" id="eliminar">ELIMINAR</button>
    </td>
    </tr>
    `
}
// Aqui se crea la funcion borrar formulario que nos sirve para resetear el formulario cada vez que se ingresa una mascota.
function borrarFormulario (){
    formulario.reset()
}
//  Aqui se crea la funcion BorrarFila para poder eliminar la fila correspondiente al id de la mascota que se entrega. EL método findIndex me encuentra el índice de la mascota que se va a eliminar.  (m) => m.id == id, busca la primera mascota del arregloMascotas que su id coincide con el id que se dio como argumento.
function borrarFila (id){
const indice = arregloMascotas.findIndex((m) =>m.id == id )
// Aquí con el metodo splice borramos  una mascota del array de mascotas, tenemos dos argumentos a eliminar indice que es el lugar en el array donde esta el id de la mascota indicada y el 1 nos dice que borrara solo un elemento.
arregloMascotas.splice(indice, 1)
// Llamamos a la funcion guardarEnLS para actualizar la informacion en el LocalStorage.
guardarEnLS()
// Con tabla.innerHTML = '' Borramos  todas las filas para agregar las filas actualizadas
tabla.innerHTML = ''
//  Se llama a la función obtenerLS paracargar los datos de las mascotas guardados en el localStorage y actualizar la tabla.
obtenerLS()
}
// Llamamos a la funcion guardarEnLS para actualizar la informacion en el LocalStorage.
// JSON.stringify convierte mi arreglo en texto plano
function guardarEnLS (){
    localStorage.setItem('mascotas', JSON.stringify(arregloMascotas))
}

// funcion para editar la fila que recibe como parametro el id para buscar la mascota a editar
function editarFila (id){
// igualamos  el idmascotaEdit con el id de la mascota que estamos editando en ese momento.
    idmascotaEdit = id
    // aqui ocupo el metodo find para buscar la mascota con el id del parametro y guardaela en la constante (ocupe la misma tecnica utilizada en borrar fila)
const mascota = arregloMascotas.find((m) =>m.id == id )
// Con actualizar llamo a mi boton y ocupo los metodos classList y remove para poder quitar  la clase (para quitar display none de css)
actualizar.classList.remove('oculto')
// Al boton agregar se le añade la clase oculto, para que tenga las propiedades de display none en  css
agregar.classList.add('oculto')

//Ocupo la condicional if  para  ver si mascota tiene el mismo valor que el tipo? aqui no estoy segura
if(mascota){
    nombre.value = mascota.nombre;
    tipo.value = mascota.tipo;
    raza.value = mascota.raza;

}
}
// Se crea la funcion que se llama cuando hacemos click en el boton de actualizar
function editarMascota (event){
event.preventDefault()
// Creamos el objeto mascota con los datos del formulario una vez que este sea modificado.
const mascota = {
    id: idmascotaEdit,
    nombre: nombre.value,
    tipo: tipo.value,
    raza: raza.value
}
// buscamos la posicion en el arreglo de la mascota que estamos editando
const index  = arregloMascotas.findIndex(masc => masc.id == idmascotaEdit)
// modifica la mascota encontrada en la posicion index con los nuevos datos del formulario
arregloMascotas[index] = mascota
guardarEnLS()
borrarFormulario()
actualizar.classList.add('oculto')
agregar.classList.remove('oculto')
idmascotaEdit = null
tabla.innerHTML = ''
obtenerLS()

}
// Aqui escuchamos el click en el boton actualizar
actualizar.addEventListener('click', editarMascota)