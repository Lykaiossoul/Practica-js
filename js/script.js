// const dragones = [
//     {
//         id: 1,
//         nombre: "Skynight",
//         elemento: "Oscuridad",
//         rareza: "Legendario",
//     },
//     {
//         id: 2,
//         nombre: "Frostbite",
//         elemento: "Hielo",
//         rareza: "Raro",
//     },
//     {
//         id: 3,
//         nombre: "Sorana",
//         elemento: "Aire",
//         rareza: "Comun",
//     },
//     {
//         id: 4,
//         nombre: "Aobi",
//         elemento: "Fuego",
//         rareza: "Epico",
//     },
//     {
//         id: 5,
//         nombre: "Hikari",
//         elemento: "Luz",
//         rareza: "Poco comun",
//     },
//     {
//         id: 6,
//         nombre: "Ikazuchi",
//         elemento: "Electrico",
//         rareza: "Comun",
//     },
//     {
//         id: 7,
//         nombre: "Shinme",
//         elemento: "Tierra",
//         rareza: "Raro",
//     },
//     {
//         id: 8,
//         nombre: "Kuro",
//         elemento: "Oscuridad",
//         rareza: "Poco comun",
//     },
//     {
//         id: 9,
//         nombre: "Syrcasca",
//         elemento: "Agua",
//         rareza: "Epico",
//     },
//     {
//         id: 10,
//         nombre: "Vulcanus",
//         elemento: "Fuego",
//         rareza: "Raro",
//     },
//     {
//         id: 11,
//         nombre: "Aurora",
//         elemento: "Hielo",
//         rareza: "Legendario",
//     },
//     {
//         id: 12,
//         nombre: "Nimara",
//         elemento: "Agua",
//         rareza: "Comun",
//     },
//     {
//         id: 13,
//         nombre: "Ygdrasil",
//         elemento: "Tierra",
//         rareza: "Legendario",
//     },
//     {
//         id: 14,
//         nombre: "Thunderclaw",
//         elemento: "Electrico",
//         rareza: "Epico",
//     },
//     {
//         id: 15,
//         nombre: "Zpyra",
//         elemento: "Luz",
//         rareza: "Comun",
//     },
// ]

const jsonCriaturas = "./db/data.json";
let criaturas = [];
let coleccion = JSON.parse(localStorage.getItem("coleccion")) || [];
let contenedorCriaturas = document.getElementById("contenedor-criaturas");
let buscadorInput = document.getElementById("buscador-criaturas");

// version fetch
// function arrayCriaturas() {
//     fetch(jsonCriaturas)
//         .then(response => response.json())
//         .then(data => {
//             criaturas = data;
//             renderizarCriaturas(criaturas);
//         })
//         .catch(error => console.log("Hubo un error", error));
// }

// version async-await
async function arrayCriaturas() {
    try {
        let response = await fetch(jsonCriaturas);
        let data = await response.json();

        criaturas = data;
        renderizarCriaturas(criaturas);
    } catch (error) {
        contenedorCriaturas.innerHTML = `<p>Los pergaminos se han perdido. Error al cargar las criaturas.</p>`;
    }
}


//1.Creacion de tarjetas de criaturas
function renderizarCriaturas(TarjetasCriaturas) {
    contenedorCriaturas.innerHTML = "";
    TarjetasCriaturas.forEach(criatura => {
        let card = document.createElement("div");
        card.className = "tarjeta-criatura";
        if (criatura.descubierto === false) {
            // Asignamos las dos clases juntas separadas por un espacio
            card.className = "tarjeta-criatura silueta";
            card.innerHTML = `
                <img src="${criatura.imagen}" alt="Criatura misteriosa">
                <h3>???</h3>
                <p><strong>Elemento:</strong> Desconocido</p>
                <p><strong>Rareza:</strong> Desconocida</p>
                <button id="btn-${criatura.id}">Registrar</button>`;

        } else {
            //aqui se quita la clase de silueta
            card.className = "tarjeta-criatura";
            card.innerHTML = `
                <img src="${criatura.imagen}" alt="${criatura.nombre}">
                <h3>${criatura.nombre}</h3>
                <p><strong>Elemento:</strong> ${criatura.elemento}</p>
                <p><strong>Rareza:</strong> ${criatura.rareza}</p>
                <p><strong>Avistamientos:</strong> ${criatura.avistamientos}</p>
                <button id="btn-${criatura.id}">Nueva observacion</button>`;
        }
        contenedorCriaturas.appendChild(card);
        let boton = document.getElementById("btn-" + criatura.id);
        boton.addEventListener("click", () => {
            actualizacionDeObservaciones(criatura.id);
        });
    })
}

//llamamos a la funcion async porque esta ya tiene al final de su codigo el llamado de la 
// funcion renderizar criaturas, con esto llamamos a ver el resultado final de la union de ambas funciones.
arrayCriaturas()

function actualizacionDeObservaciones(idDeCriatura){
    //hacemos una varaible para almacenar a la criatura que se encontro en cada caso y le pedimos que busque una a una por el array json
    let criaturaSeleccionada = criaturas.find(criatura => criatura.id === idDeCriatura);
    criaturaSeleccionada.descubierto = true;
    criaturaSeleccionada.avistamientos++;
    renderizarCriaturas(criaturas);
}


// //if usando .classList.add()
// if (criatura.descubierto === false) {
//     // .add() simplemente "pega" la clase extra al final de la lista
//     card.classList.add("silueta");
//     card.innerHTML = `
//                 <img src="${criatura.imagen}" alt="Criatura misteriosa">
//                 <h3>???</h3>
//                 <p><strong>Elemento:</strong> Desconocido</p>
//                 <p><strong>Rareza:</strong> Desconocida</p>
//                 <button id="btn-${criatura.id}">Registrar</button>`;
// } else {
//     // Si ya está descubierta, no agregamos "silueta", 
//     // y si la tuviera de antes, podríamos usar .remove("silueta")
//     card.innerHTML = `
//                 <img src="${criatura.imagen}" alt="${criatura.nombre}">
//                 <h3>${criatura.nombre}</h3>
//                 <p><strong>Elemento:</strong> ${criatura.elemento}</p>
//                 <p><strong>Rareza:</strong> ${criatura.rareza}</p>
//                 <p><strong>Avistamientos:</strong> ${criatura.avistamientos}</p>
//                 <button id="btn-${criatura.id}">Avistar de nuevo</button>`;
// }




buscar.addEventListener("input", filtrarDragones)

//filtrar por nombre
function filtrarDragones() {
    let textoIngresado = buscar.value;
    let dragonesFiltrados = dragones.filter(dragon => dragon.nombre.includes(textoIngresado));
    renderizarDragones(dragonesFiltrados);
}

//añadir a la coleccion
function añadirAColeccion(idDelDragon) {
    const seleccion = dragones.find(dragon => dragon.id === idDelDragon);
    const yaExiste = dragonesObservados.some(dragon => dragon.id === idDelDragon);
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
    dragonesObservados.forEach(dragon => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${dragon.nombre}</span> 
            <button id="borrar-${dragon.id}">Eliminar</button>`;
        listaAvistados.appendChild(li);
        let botonBorrar = document.getElementById(`borrar-${dragon.id}`);
        //Asignar evento click a cada boton de eliminar
        botonBorrar.addEventListener("click", () => {
            eliminarDeColeccion(dragon.id);
        });
    });
}

//Borrar de la coleccion 
function eliminarDeColeccion(idParaBorrar) {
    dragonesObservados = dragonesObservados.filter(dragon => dragon.id !== idParaBorrar);

    localStorage.setItem("coleccion", JSON.stringify(dragonesObservados));
    renderizarColeccion();
}
arrayDragones();
