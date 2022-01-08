/*
PENDIENTE

ver paginacion: https://breakingbadapi.com/api/characters?limit=10&offset=10 

DOCUMENTACION: https://breakingbadapi.com/documentation

SECCIONES CITAS Y MUERTES??*/


//*****Seleccion elementos del Dom y Variables*******
const UrlBase = "https://www.breakingbadapi.com/api/"
const endPointCharacters = "https://breakingbadapi.com/api/characters"
const endPointEpisodios = "https://breakingbadapi.com/api/episodes"

const botonInfo = document.querySelector("#boton-info")
const seccionInfoGeneral = document.querySelector(".info-general")

const botonPersonajes = document.querySelector("#boton-personajes")
const botonEpisodios = document.querySelector("#boton-episodios")
const contenedorImgNav = document.querySelector(".contenedor-img-nav")

const hero = document.querySelector(".hero")
const seccionBuscador = document.querySelector(".seccion-buscador")
const formBusqueda = document.querySelector("#form-busqueda")
const inputBusqueda = document.querySelector("#input-busqueda")

const botonAnterior = document.querySelector("#anterior")
const botonSiguiente = document.querySelector("#siguiente")

const seccionPersonajes = document.querySelector(".seccion-personajes")
const cardPersonajes = document.querySelector("#card-personajes")


const tarjetasIndividuales = document.querySelector(".tarjetas-individuales")
const contenedorTarjetasIndividuales = document.querySelector(".contenedor-tarjetas-individuales")
const botonVolver = document.querySelector(".boton-volver")


const seccionEpisodios = document.querySelector(".seccion-episodios")
const cardEpisodios = document.querySelector("#card-episodios")

//*******Get endpoint personajes***********
let paginaActual= 0
const traerInfoPersonajes= () =>{
    fetch(`https://www.breakingbadapi.com/api/characters?limit=5&offset=${paginaActual * 5}`)

    .then(res => res.json())
    .then(data => {
      console.log(data)
      crearTarjeta(data)
    })
}

botonAnterior.onclick = () => {
    paginaActual--
    traerInfoPersonajes()
  }
  
botonSiguiente.onclick = () => {
    paginaActual++
    traerInfoPersonajes()
  }
  
  traerInfoPersonajes()

traerInfoPersonajes()

//**********Get endpoint episodios************
const traerInfoEpisodios= () =>{
    fetch(endPointEpisodios)
    .then((res) =>  res.json())
    .then((data) => {
        crearTarjetaEpisodios(data)
    })
}
  
traerInfoEpisodios()


//*********crear tarjetas en html de los personajes***********
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
    clickTarjetaPersonaje()  
}

traerInfoPersonajes()


//********crear tarjetas en html de los episodios********
const crearTarjetaEpisodios = (data) =>{

    const mostrarEnHtml = data.reduce ((acc, elemento) =>{

        return acc + 
        `
        <div class="tarjeta-episodio" data-id="${elemento.episode_id}" >
        <p style="text-align: center"><strong>Episodio Nro: </strong>${elemento.episode}</p>
        <p> <strong>Titulo:</strong>  ${elemento.title}</p>
        <p><strong>Temporada:</strong> ${elemento.season}</p>
        <p><strong>Fecha estreno:</strong> ${elemento.air_date}</p>
        <p><strong>Personajes:</strong> ${elemento.characters}</p>
        </div>
        `
    }, "")
    cardEpisodios.innerHTML = mostrarEnHtml
    
}
traerInfoEpisodios()


//***Interacciones con los botones nav y tarjeta individual****
contenedorImgNav.onclick = () => {
    hero.classList.remove("ocultar")
    seccionBuscador.classList.add("ocultar")
    seccionPersonajes.classList.add("ocultar")
    seccionEpisodios.classList.add("ocultar")
    contenedorTarjetasIndividuales.classList.add("ocultar")
}

// const botonInfo = document.querySelector(".boton-info")
// const seccionInfoGeneral = document.querySelector(".info-general")
botonInfo.onclick = () => {
    hero.classList.add("ocultar")
    seccionInfoGeneral.classList.remove("ocultar")
}

botonPersonajes.onclick = () => {
    hero.classList.add("ocultar")
    seccionBuscador.classList.remove("ocultar")
    seccionPersonajes.classList.remove("ocultar")
    seccionEpisodios.classList.add("ocultar")
    cardPersonajes.classList.remove("ocultar")
}

botonEpisodios.onclick = () => {
    hero.classList.add("ocultar")
    seccionPersonajes.classList.add("ocultar")
    seccionEpisodios.classList.remove("ocultar") 
    seccionBuscador.classList.add("ocultar")
    contenedorTarjetasIndividuales.classList.add("ocultar")
}

botonVolver.onclick = () => {
    hero.classList.add("ocultar")
    seccionBuscador.classList.remove("ocultar")
    seccionPersonajes.classList.remove("ocultar")
    seccionEpisodios.classList.add("ocultar")
    cardPersonajes.classList.remove("ocultar")
    //tarjetasIndividuales.classList.add("ocultar")
    contenedorTarjetasIndividuales.classList.add("ocultar")
}

//*****busqueda por personajes en campo busqueda****
const busquedaPersonajes = (busqueda) => {

    fetch(`https://breakingbadapi.com/api/characters?name=${busqueda}`)
        .then((res) => res.json())
        .then((data) => {
            crearTarjeta(data)

        })
}

formBusqueda.onsubmit = (e) => {
    e.preventDefault()
    busquedaPersonajes(inputBusqueda.value)
}


//*******Card individual*******
const verCardIndividual = (char_id) =>{
    fetch(`https://breakingbadapi.com/api/characters/${char_id}`)
    .then((res) => res.json())
    .then((data) =>{
       console.log(data)

       console.log("ver tarjeta individual")

       const elemento = data[0]

       const crearTarjetaIndiviual = 
        `
        <div class="tarjeta-individual" data-id="${elemento.char_id}">
        <div class="contenedor-imagen">
            <img id="imagen-personaje" src="${elemento.img}" alt="">
        </div>
        <p id="nombre-personaje"> <strong>Nombre:</strong> ${elemento.name}</p>
        <p id="nickname-personaje"><strong>Nick Name:</strong> Nick Name:${elemento.nickname}</p>
        <p id="ocupacion-personaje"><strong>Ocupación:</strong>  ${elemento.occupation}</p>
        <p id="status-personaje"><strong>Status:</strong> ${elemento.status}</p>
        </div>
       `
       
       tarjetasIndividuales.innerHTML = crearTarjetaIndiviual

    })
}

const clickTarjetaPersonaje = () =>{
    const cards = document.querySelectorAll(".tarjeta");
    
    for (let i = 0; i< cards.length; i++) {
        
        cards[i].onclick = () =>{
            const idPersonajes = cards[i].dataset.id;
            contenedorTarjetasIndividuales.classList.remove("ocultar")
            cardPersonajes.classList.add("ocultar")
            verCardIndividual(idPersonajes);
        }
    }
} 

