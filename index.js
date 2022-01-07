/*
PENDIENTE
Al hacer click en cada tarjeta,
La lista de tarjetas debe ocultarse.
Debes hacer un fetch al recurso específico usando el id que te da la api
Debes hacer una tarjeta de detalles del recurso
Seguí el código de la clase anterior para guiarte.*/


//Seleccion elementos del Dom y Variables
const UrlBase = "https://www.breakingbadapi.com/api/"
const endPointCharacters = "https://breakingbadapi.com/api/characters"

const botonPersonajes = document.querySelector("#boton-personajes")

const hero = document.querySelector(".hero")
const seccionBuscador = document.querySelector(".seccion-buscador")
const formBusqueda = document.querySelector("#form-busqueda")
const inputBusqueda = document.querySelector("#input-busqueda")

const seccionPersonajes = document.querySelector(".seccion-personajes")
const cardPersonajes = document.querySelector("#card-personajes")
const contenedorTarjetasIndividuales = document.querySelector(".contenedor-tarjetas-individuales")




//Get endpoint personajes
const traerInfoPersonajes= () =>{
  fetch(endPointCharacters)
  .then((res) =>  res.json())
  .then((data) => {
    crearTarjeta(data)
  })
}

traerInfoPersonajes()


//crear tarjetas en html de los personajes
const crearTarjeta = (data) =>{

    const mostrarEnHtml = data.reduce ((acc, elemento) =>{

        return acc + 
        `
        <div class="tarjeta" data-id="${elemento.char_id}">
        <div class="contenedor-imagen">
            <img id="imagen-personaje" src="${elemento.img}" alt="">
        </div>
        <p id="nombre-personaje"> <strong>Nombre:</strong> ${elemento.name}</p>
        
        </div>
        `
    }, "")
    cardPersonajes.innerHTML = mostrarEnHtml
    //asignarClicksACards()
}

traerInfoPersonajes()


botonPersonajes.onclick = () => {
    console.log("click en boton")
    hero.classList.toggle("ocultar")
    seccionBuscador.classList.toggle("ocultar")
    seccionPersonajes.classList.toggle("ocultar")

}

//busqueda por personajes
const busquedaPersonajes = (busqueda) => {
 
   fetch(`https://breakingbadapi.com/api/characters?name=${busqueda}`)
  .then((res) =>  res.json())
  .then((data) => {
   crearTarjeta(data)

    })
}

formBusqueda.onsubmit = (e) => {
    e.preventDefault()
    busquedaPersonajes(inputBusqueda.value)
}



//Card individual
// const verCardIndividual = (char_id) =>{
//     fetch(`https://breakingbadapi.com/api/characters/${char_id}`)
//     .then((res) => res.json())
//     .then((data) =>{
//        console.log(data)

//        console.log("ver tarjeta individual")
//        //ocultar contenerdor tarjetar
//        cardPersonajes.classList.toggle(".ocultar")

//        //mostar contenedor tarjeta individual
//        seccionPersonajes.classList.toggle(".ocultar") 
       
//        //crear tarjeta de personaje individUAL
//        const crearTarjetaIndiviual = () =>{
//         `
//         <div class="tarjeta" data-id="${elemento.char_id}">
//         <div class="contenedor-imagen">
//             <img id="imagen-personaje" src="${elemento.img}" alt="">
//         </div>
//         <p id="nombre-personaje"> <strong>Nombre:</strong> ${elemento.name}</p>
//         <p id="nickname-personaje">Nick Name:${elemento.nickname}</p>
//         <p id="ocupacion-personaje">Ocupación: ${elemento.occupation}</p>
//         <p id="status-personaje">Status: ${elemento.status}</p>
//         </div>
//        `
//        }
//        contenedorTarjetasIndividuales.innerHTML = crearTarjetaIndiviual

//     })
// }

// const asignarClicksACards = () =>{
//     const cards = document.querySelectorAll(".tarjeta");
    
//     for (let i = 0; i< cards.length; i++) {
        
//         cards[i].onclick = () =>{
//             const idPersonajes = cards[i].dataset.id;
//             verCardIndividual(idPersonajes);
//         }
//     }
// } 

