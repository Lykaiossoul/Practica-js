const dragones = [
    {
        id: 1,
        nombre: "Skynight",
        elemento: "Oscuridad",
        rareza: "Legendario",
    },
    {
        id: 2,
        nombre: "Frostbite",
        elemento: "Hielo",
        rareza: "Raro",
    },
    {
        id: 3,
        nombre: "Sorana",
        elemento: "Aire",
        rareza: "Comun",
    },
    {
        id: 4,
        nombre: "Aobi",
        elemento: "Fuego",
        rareza: "Epico",
    },
    {
        id: 5,
        nombre: "Hikari",
        elemento: "Luz",
        rareza: "Poco comun",
    },
    {
        id: 6,
        nombre: "Ikazuchi",
        elemento: "Electrico",
        rareza: "Comun",
    },
    {
        id: 7,
        nombre: "Shinme",
        elemento: "Tierra",
        rareza: "Raro",
    },
    {
        id: 8,
        nombre: "Kuro",
        elemento: "Oscuridad",
        rareza: "Poco comun",
    },
    {
        id: 9,
        nombre: "Syrcasca",
        elemento: "Agua",
        rareza: "Epico",
    },
    {
        id: 10,
        nombre: "Vulcanus",
        elemento: "Fuego",
        rareza: "Raro",
    },
    {
        id: 11,
        nombre: "Aurora",
        elemento: "Hielo",
        rareza: "Legendario",
    },
    {
        id: 12,
        nombre: "Nimara",
        elemento: "Agua",
        rareza: "Comun",
    },
    {
        id: 13,
        nombre: "Ygdrasil",
        elemento: "Tierra",
        rareza: "Legendario",
    },
    {
        id: 14,
        nombre: "Thunderclaw",
        elemento: "Electrico",
        rareza: "Epico",
    },
    {
        id: 15,
        nombre: "Zpyra",
        elemento: "Luz",
        rareza: "Comun",
    },
]
const contenedorDragones = document.getElementById("contenedor-dragones");
// 2. Creamos una función que se encargará de "dibujar" los dragones en el contenedor. Esta función recibirá una lista de dragones y generará el HTML necesario para mostrarlos.
function renderizarDragones(listaDeDragones) {
    contenedorDragones.innerHTML = "";
    listaDeDragones.forEach(dragon => {
        let card = document.createElement("div");
        card.className = "tarjeta-dragon";
        card.innerHTML = `<h3>${dragon.nombre}</h3>
            <p><strong>Elemento:</strong> ${dragon.elemento}</p>
            <p><strong>Rareza:</strong> ${dragon.rareza}</p>
            <button id="btn-${dragon.id}">¡Avistado!</button>`;
        contenedorDragones.appendChild(card);
    });
}

// 4. LA ORDEN DE EJECUCIÓN (Va aquí abajo, al final de todo)
renderizarDragones(dragones);

let buscar = document.getElementById("buscador");
buscar.addEventListener("input", filtrarDragones)

function filtrarDragones() {
    let textoIngresado = buscar.value;
    let dragonesFiltrados = dragones.filter(function (dragon) {
        return dragon.nombre.includes(textoIngresado);
    });
    renderizarDragones(dragonesFiltrados);
}

