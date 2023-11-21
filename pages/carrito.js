
let totalCarrito

document.addEventListener("DOMContentLoaded", function () {
    const catalogo = document.getElementById("catalogo")
    const carrito = document.getElementById("carrito")
    totalCarrito = document.getElementById("total")
    cargarCarritoDesdeLS()
})

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

            const agregarCarrito = document.createElement("button")
            agregarCarrito.className = "btn btn-primary"
            agregarCarrito.textContent = "Agregar al carrito"

            //Agrego evento al boton para la logica del carrito
            agregarCarrito.addEventListener("click", function () {
                agregarAlCarrito(producto)
            })

            //Agregar elementos a la card
            cardBody.appendChild(titulo)
            cardBody.appendChild(precio)
            cardBody.appendChild(agregarCarrito)

            card.appendChild(imagen)
            card.appendChild(cardBody)

            //Agregar la tarjeta al catalogo
            catalogo.appendChild(card)
        })
    })
    .catch(error => console.error("Error al obtener los datos del JSON", error))

//Funcion para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const itemCarrito = document.createElement("li")
    itemCarrito.textContent = `${producto.producto} - $${producto.precio}`

    //Agregar el elemento al carrito
    document.getElementById("listaCarrito").appendChild(itemCarrito)

    //Actualizar el total del carrito
    const total = calcularTotalCarrito()
    totalCarrito.textContent = `Total: $${total}`

    //Guardar el carrito en el localStorage
    guardarCarrito(total)
}

//Funcion para calcular el total del carrito
function calcularTotalCarrito() {
    const carritoItems = document.getElementById("listaCarrito").getElementsByTagName("li")
    let total = 0

    for (let i = 0; i < carritoItems.length; i++) {
        const precioTexto = carritoItems[i].textContent.split(" - ")[1].replace("$", "")
        total += parseFloat(precioTexto)
    }

    return total
}

//Evento para vaciar el carrito
document.getElementById("vaciarCarrito").addEventListener("click", function () {
    //Vaciar la lista del carrito
    document.getElementById("listaCarrito").innerHTML = ""

    //Poner el total en 0
    totalCarrito.textContent = "total: $0"

    //Vaciar el carrito en el localStorage
    localStorage.removeItem("carrito")
    localStorage.removeItem("total")

    guardarCarrito(0)
})

//Funcion para guardar el carrito en el localStorage
function guardarCarrito(total) {
    const carritoItems = Array.from(document.getElementById("listaCarrito").getElementsByTagName("li"))
    const carritoArray = carritoItems.map(item => item.textContent)

    localStorage.setItem("carrito", JSON.stringify(carritoArray))
    localStorage.setItem("total", JSON.stringify(total))

    // if (carritoArray.length === 0) {
    //     localStorage.setItem("total", JSON.stringify(0))
    // } else {
    //     localStorage.setItem("total", JSON.stringify(total))
    // }
}

//Cargar el carrito desde el localStorage al cargar la pagina
document.addEventListener("DOMContentLoaded", function () {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || [])
    const totalGuardado = parseFloat(localStorage.getItem("total") || 0)

    carritoGuardado.forEach(producto => {
        const itemCarrito = document.createElement("li")
        itemCarrito.textContent = producto
        document.getElementById("listaCarrito").appendChild(itemCarrito)
    })

    totalCarrito.textContent = `Total: $${totalGuardado}`
})

//Boton de realizar compra con sweetAlert2
const realizarCompra = document.querySelector("#realizarCompra")

realizarCompra.addEventListener("click", () => {
    Swal.fire({
        title: "Compra realizada",
        icon: "success"
    });

    //Vaciar la lista del carrito
    document.getElementById("listaCarrito").innerHTML = ""

    //Poner el total en 0
    totalCarrito.textContent = "total: $0"

    //Vaciar el carrito en el localStorage
    localStorage.removeItem("carrito")
    localStorage.removeItem("total")

    guardarCarrito(0)
})