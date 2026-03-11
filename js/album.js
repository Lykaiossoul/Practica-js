const jsonCriaturas = "../db/data.json";
let criaturasDelAlbum = [];
let contenedorColeccion = document.getElementById("contenedor-coleccion");


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
    contenedorColeccion.innerHTML = "";
    TarjetasCriaturas.forEach(criatura => {
        let card = document.createElement("div");
        card.className = "tarjeta-criatura";
        //creando una variable para la ruta de la imagen, IA guia este metodo nuevo para mi
        let rutaImagenParaAlbum = "." + criatura.imagen;
        let iconoFavorito = "";
        if (criatura.favorito === true) {
            iconoFavorito = "★"; //esta estrella me la dio la IA, asi que espero que se pueda usar
        } else {
            iconoFavorito = "☆";
        }
        card.innerHTML = `
                <img src="${rutaImagenParaAlbum}" alt="${criatura.nombre}">
                <h3>${criatura.nombre}</h3>
                <p><strong>Elemento:</strong> ${criatura.elemento}</p>
                <p><strong>Rareza:</strong> ${criatura.rareza}</p>
                <p><strong>Avistamientos:</strong> ${criatura.avistamientos}</p>
                <button id="fav-${criatura.id}" class="btn-favorito"> ${iconoFavorito}</button>`;
        contenedorColeccion.appendChild(card);
        let botonFav = document.getElementById("fav-" + criatura.id);
        botonFav.addEventListener("click", () => {
            alternarFavorito(criatura.id);
        });
    });
}

function alternarFavorito(idDelFavorito) {
    let criaturaSeleccionada = criaturasDelAlbum.find(criatura => criatura.id === idDelFavorito);
    if (criaturaSeleccionada.favorito === true) {
        criaturaSeleccionada.favorito = false;
    } else {
        criaturaSeleccionada.favorito = true;
    }
    localStorage.setItem("registroDeColeccion", JSON.stringify(criaturasDelAlbum));
    let botonDeFavorito = document.getElementById("fav-" + idDelFavorito);
    if (criaturaSeleccionada.favorito === true) {
        botonDeFavorito.innerText = "★";
    } else {
        botonDeFavorito.innerText = "☆";
    }
}