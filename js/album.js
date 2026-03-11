const jsonCriaturas = "../db/data.json";
let criaturasDelAlbum = [];
const contenedorColeccion = document.getElementById("contenedor-coleccion");


async function cargarAlbum() {
    try {
        //Buscamos en el LocalStorage
        let datosDelColeccionistaDelAlbum = JSON.parse(localStorage.getItem("registroDeColeccion"));
        if (datosDelColeccionistaDelAlbum) {
            criaturasDelAlbum = datosDelColeccionistaDelAlbum;
        } else {
            //Si no hay nada, cargamos el JSON original
            let respuesta = await fetch(jsonCriaturas);
            criaturasDelAlbum = await respuesta.json();
        }
        //pero como cargamos todas las criaturas ¿ debemos Filtramos para que el album solo muestre las descubiertas
        let misCriaturas = criaturasDelAlbum.filter(criatura => criatura.descubierto === true);
        //ahora llamamos(renderizar) con la funcion del diseño de las tarjetas en la nueva variable que tiene las criaturas ya filtradas
        renderizarCriaturas(misCriaturas);
    } catch (error) {
        console.error("Error al cargar el álbum:", error);
    }
}
cargarAlbum()

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