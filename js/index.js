
// 1. FUNCIÓN: Manejo del inicio (Control de flujo)
function iniciarAventura() {
    let entrenadorDragon = confirm("¿quieres ser un entrenador de dragones?");
    
    if (entrenadorDragon) {
        console.log("Si quiere ser un entrenador de dragones");
        alert("Vamos a escoger a tu dragon!");
        return true; 
    } else {
        console.log("Vino a perder su tiempo");
        alert("Vuelve si te arrepientes");
        return false;
    }
}

// 2. FUNCIÓN: Selección de elemento con Array e Includes
function seleccionarElemento() {
    let elementoDragon = "";
    const opcionesValidas = ["Fuego", "Agua", "Tierra", "Aire"];

    // Mientras lo que escriba el usuario NO esté en el array, sigue preguntando
    while (!opcionesValidas.includes(elementoDragon)) {
        elementoDragon = prompt("Escoge el elemento de tu dragon: Fuego, Agua, Tierra o Aire");
        console.log("El usuario escogio: " + elementoDragon);
    }
    
    return elementoDragon;
}

// 3. FUNCIÓN: Cálculo de carne con validación de tipo de dato
function calcularCrianza(cantidadComida) {
    let edadIngresada = prompt("¿Cuántos años tiene tu dragón?");

    // Si el usuario ingresa letras, el bucle le pedirá el dato de nuevo
    while (isNaN(edadIngresada) || edadIngresada.trim() === "") {
        edadIngresada = prompt("Por favor, ingresa los años de tu dragón en números:");
    }

    let resultado = edadIngresada * cantidadComida;
    
    console.log("La cantidad total de carne necesaria para criar al dragón es: " + resultado + " kg.");
    alert("La cantidad total de carne necesaria para criar a tu dragón es: " + resultado + " kg.");
}

// --- EJECUCIÓN DEL PROGRAMA ---

// El programa solo avanza si iniciarAventura devuelve 'true'
if (iniciarAventura()) {
    seleccionarElemento();
    
    alert("¡Excelente elección! Ahora vamos a criar al dragón.");

    // Llamamos a la función de cálculo con los 1000 kg base
    calcularCrianza(1000);

    let inventario = ["Varita", "Espada", "Arco", "Tunica", "Armadura", "Pocion", "Carne", "Huevo de dragon"];
    console.log("Inventario inicial: " + inventario);
    alert("Tu inventario inicial es: " + inventario.join(", "));
}