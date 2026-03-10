
const jsonCriaturas = "./db/data.json";
let criaturas = [];
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
    let datosDelColeccionista = JSON.parse(localStorage.getItem("registroDeColeccion"));
    if (datosDelColeccionista) {
        criaturas = datosDelColeccionista;
        renderizarCriaturas(criaturas);
    }
    else {

        try {
            let response = await fetch(jsonCriaturas);
            let data = await response.json();

            criaturas = data;
            renderizarCriaturas(criaturas);
        } catch (error) {
            contenedorCriaturas.innerHTML = `<p>Los pergaminos se han perdido. Error al cargar las criaturas.</p>`;
        }
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

function actualizacionDeObservaciones(idDeCriatura) {
    //hacemos una varaible para almacenar a la criatura que se encontro en cada caso y le pedimos que busque una a una por el array json
    let criaturaSeleccionada = criaturas.find(criatura => criatura.id === idDeCriatura);
    criaturaSeleccionada.descubierto = true;
    criaturaSeleccionada.avistamientos++;
    localStorage.setItem("registroDeColeccion", JSON.stringify(criaturas))
    renderizarCriaturas(criaturas);
}

buscadorInput.addEventListener("input", function () {
    let textoBuscado = buscadorInput.value;
    if (textoBuscado === "") {
        //llamamos al array cuando dejamos a la casilla de buscar vacia
        renderizarCriaturas(criaturas);
    }
    else {
        let resultadoDeBusqueda = criaturas.filter(function (criatura) {
            return criatura.nombre.includes(textoBuscado) && criatura.descubierto === true;
        });
        //nueva array llamada con el filtro de busqueda textual
        renderizarCriaturas(resultadoDeBusqueda);
    }

});


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




