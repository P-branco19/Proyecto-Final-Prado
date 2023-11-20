// //Restaurar los datos del usuario desde el localstorage
// document.addEventListener("DOMContentLoaded", function () {
//     const nombreGuardado = localStorage.getItem("nombre")
//     const apellidoGuardado = localStorage.getItem("apellido")

//     if (nombreGuardado && apellidoGuardado) {
//         const parrafo = document.createElement("p")
//         parrafo.textContent = `Bienvenido ${nombreGuardado} ${apellidoGuardado}`
//         bienvenida.appendChild(parrafo)
//     }
// })


// //Bienvenida del usuario:
// const formulario = document.getElementById("formulario");
// const bienvenida = document.getElementById("bienvenida");

// document.getElementById("enviar").addEventListener("click", function () {
//     //tomo los valores del formulario
//     const nombre = document.getElementById("nombre").value
//     const apellido = document.getElementById("apellido").value

//     //almaceno los datos en el localstorage
//     localStorage.setItem("nombre", nombre)
//     localStorage.setItem("apellido", apellido)

//     //creo un parrafo para mostrar los datos
//     const parrafo = document.createElement("p")
//     parrafo.textContent = `Bienvenido ${nombre} ${apellido}`

//     //agrego el parrafo al div de bienvenida
//     bienvenida.appendChild(parrafo)

//     //reset del formulario
//     formulario.reset()
// })

// //Restaurar el carrito desde el localstorage
// document.addEventListener("DOMContentLoaded", function () {
//     const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || [])
//     const totalGuardado = parseFloat(localStorage.getItem("total") || 0)

//     // Limpiar el contenido existente del carrito antes de agregar los nuevos elementos
//     carrito.innerHTML = ""

//     carritoGuardado = forEach(function (producto) {
//         const itemCarrito = document.createElement("li")
//         itemCarrito.textContent = producto
//         carrito.appendChild(itemCarrito)
//     })

//     total = totalGuardado
//     totalCarrito.textContent = `Total: $${total}`
// })


// //Agregar productos al carrito:
// const botonesAgregar = document.getElementsByClassName("agregarCarrito")
// const carrito = document.getElementById("listaCarrito")
// const totalCarrito = document.getElementById("total")
// const vaciarCarrito = document.getElementById("vaciarCarrito")

// let total = 0

// for (let i = 0; i < botonesAgregar.length; i++) {
//     botonesAgregar[i].addEventListener("click", function () {
//         const tarjeta = this.parentElement
//         const nombre = tarjeta.getElementsByClassName("card-title")[0].textContent
//         const precioTexto = tarjeta.getElementsByClassName("card-subtitle")[0].textContent

//         //Extrae el precio numerico del texto
//         const precio = parseFloat(precioTexto.replace("$", ""))

//         //Actualiza el total
//         total += precio

//         //Crea un elemento de lista con nombre y precio:
//         const itemCarrito = document.createElement("li")
//         itemCarrito.textContent = `${nombre} - ${precioTexto}`

//         //Agrega el elemento al carrito
//         carrito.appendChild(itemCarrito)

//         //Actualiza el precio total
//         totalCarrito.textContent = `Total: $${total}`

//         //Guardar carrito en el localstorage
//         guardarCarrito()
//     })
// }

// //Evento para vaciar el carrito
// vaciarCarrito.addEventListener("click", function () {
//     //Vaciar la lista del carrito
//     carrito.innerHTML = ""
//     //Restablece el total a 0
//     total = 0
//     //Actualiza la visualizacion del total
//     totalCarrito.textContent = "Total: $0"
//     //Vaciar el carrito en el localstorage
//     guardarCarrito()
// })

// //Funcion para guardar el carrito en el localstorage
// function guardarCarrito() {
//     const carritoItems = Array.from(carrito.getElementsByTagName("li"))
//     const carritoArray = carritoItems.map(function (item) {
//         return item.textContent
//     })

//     localStorage.setItem("carrito", JSON.stringify(carritoArray))
//     localStorage.setItem("total", total)
// }


const catalogo = document.querySelector("#catalogo")

fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        const productos = data.productos

        productos.forEach(producto => {
            //Crear elementos para la tarjeta
            const card = document.createElement("div")
            card.className = "card"
            card.style.width = "18rem"

            const imagen = document.createElement("img")
            imagen.className = "card-img-top"
            imagen.src = producto.imagen
            imagen.alt = `imagen de ${producto.producto}`

            const cardBody = document.createElement("div")
            cardBody.className = "card-body"

            const titulo = document.createElement("h5")
            titulo.className = "card-title"
            titulo.textContent = producto.producto

            const precio = document.createElement("p")
            precio.className = "card-text"
            precio.textContent = `$${producto.precio}`

            //Agregar elementos a la card
            cardBody.appendChild(titulo)
            cardBody.appendChild(precio)

            card.appendChild(imagen)
            card.appendChild(cardBody)

            //Agregar la tarjeta al catalogo
            catalogo.appendChild(card)
        })
    })
    .catch(error => console.error("Error al obtener los datos del JSON", error))