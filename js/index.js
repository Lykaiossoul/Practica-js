
let entrenadorDragon = confirm("¿quieres ser un entrenador de dragones?");

if (entrenadorDragon) {
    console.log("Si quiere ser un entrenador de dragones");
    alert("Vamos a escoger a tu dragon!");
} else {
    console.log("Vino a perder su tiempo");
    alert("Vuelve si te arrepientes");
}

let elementoDragon = "";

while (elementoDragon != "Fuego" && elementoDragon != "Agua" && elementoDragon != "Tierra" && elementoDragon != "Aire") {
    elementoDragon = prompt("Escoge el elemento de tu dragon: Fuego, Agua, Tierra o Aire");
    console.log("El usuario escogio: " + elementoDragon);

}

alert("¡Excelente elección! Ahora vamos a criar al dragón.");

function criarDragon(edadDragon, cantidadComida) {
    let totalCarne = edadDragon * cantidadComida;
    return totalCarne;

}

let edadIngresada = prompt("¿Cuántos años tiene tu dragón?")

let resultado = criarDragon(edadIngresada, 1000);
console.log("La cantidad total de carne necesaria para criar al dragón es: " + resultado + " kg.");
alert("La cantidad total de carne necesaria para criar a tu dragón es: " + resultado + " kg.");

let inventario = ["Varita", "Espada", "Arco", "Tunica", "Armadura", "Pocion", "Carne", "Huevo de dragon"];
console.log ("Inventario inicial: " + inventario);

alert("Tu inventario inicial es: " + inventario.join(", "));