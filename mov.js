const  formulario = document.getElementById("form")

const nombre = document.getElementById("nombre")

const tipo = document.getElementById("tipo")

const  raza = document.getElementById("raza")

const agregar = document.getElementById("agregar")

agregar.addEventListener("click", (event) => {
    event.preventDefault()
const mascota = {
    nombre:  nombre.value,
    tipo: tipo.value,
    raza: raza.value
}
console.log(mascota)
} )