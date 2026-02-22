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

let dragonesObservados = JSON.parse(localStorage.getItem("coleccion")) || [];
const listaAvistados = document.getElementById("lista-avistados");
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
            <button id="btn-${dragon.id}">¡Encontrado!</button>`;
        contenedorDragones.appendChild(card);
        // 1. Capturamos el botón que acabamos de crear
        let boton = document.getElementById("btn-" + dragon.id);

        // 2. Le asignamos el evento de clic
        boton.addEventListener("click", function () {
            añadirAColeccion(dragon.id);
        });
    });
}

const buscar = document.getElementById("buscador");
buscar.addEventListener("input", filtrarDragones)

function filtrarDragones() {
    let textoIngresado = buscar.value;
    let dragonesFiltrados = dragones.filter(function (dragon) {
        return dragon.nombre.includes(textoIngresado);
    });
    renderizarDragones(dragonesFiltrados);
}


function añadirAColeccion(idDelDragon) {
    const seleccion = dragones.find(function (dragon) {
        return dragon.id === idDelDragon;
    })
    const yaExiste = dragonesObservados.some(function (dragon) {
        return dragon.id === idDelDragon;
    });
    if (yaExiste === false) {
        dragonesObservados.push(seleccion);

        // Guardamos en el LocalStorage
        localStorage.setItem("coleccion", JSON.stringify(dragonesObservados));
        renderizarColeccion();
    }
}

//Mostrar la coleccion
function renderizarColeccion() {
    listaAvistados.innerHTML = "";
    dragonesObservados.forEach(function (dragon) {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${dragon.nombre}</span> 
            <button id="borrar-${dragon.id}">Eliminar</button>`;
        listaAvistados.appendChild(li);
        let botonBorrar = document.getElementById(`borrar-${dragon.id}`);
        botonBorrar.addEventListener("click", function () {
            eliminarDeColeccion(dragon.id);
        });
    });
}

function eliminarDeColeccion(idParaBorrar) {
    dragonesObservados = dragonesObservados.filter(function (dragon) {
        return dragon.id !== idParaBorrar;
    });

    localStorage.setItem("coleccion", JSON.stringify(dragonesObservados));
    renderizarColeccion();
}

renderizarDragones(dragones);
renderizarColeccion();