let numpagina=1;
const api_root = "https://rickandmortyapi.com/api/character/";
const mainholder = document.getElementById("mainholder");
const btn_izquierda = document.getElementById("btn-izquierda");
const btn_derecha = document.getElementById("btn-derecha");
const btn_input = document.getElementById("btn-input");

async function get_characters(pagina) {
    const response = await fetch(`${api_root}?page=${pagina}`);
    const data = await response.json();
    return data.results;
}

// template fuera de main
function characterTemplate(element) {
    return `
        <article class="card">
        <h3 class="card__titulo card--texto">${element.name}</h3>
        <img width="200" height="200" class="card__imagen" src="${element.image}" alt="${element.name}">
        <p class="card__especie card--texto">${element.species}</p>
        </article>
    `;
}

async function mainController() {
    
    const hash = window.location.hash.slice(1); // "pagina=3"
    
    const params = new URLSearchParams(hash);
    const pagina = params.get("pagina");
    
    console.log('triggeado cambio de hash',pagina)



    if (pagina) {
        numpagina=parseInt(pagina, 10);
        btn_input.value=numpagina;
        cargarPagina(numpagina);
    }
    else {
        numpagina = 1;
        cambiarpagina(numpagina);
    }
   
}
async function cargarPagina(indice) {
    mainholder.innerHTML = "";
    let datos = await get_characters(indice);
    datos.forEach(element => {
        
        mainholder.insertAdjacentHTML("beforeend", characterTemplate(element));
    });
}
async function cambiarpagina(pagina){
    btn_input.value=pagina;
    window.location.hash = `pagina=${numpagina}`;

}
async function main() {
    
    btn_izquierda.addEventListener("click", () => {
        if (numpagina>1){

            numpagina-=1;
            cambiarpagina(numpagina);
        }
    });
    btn_derecha.addEventListener("click", () => {
        numpagina+=1;
        cambiarpagina(numpagina);
    });
    mainController();
}
window.addEventListener("hashchange", mainController);
window.addEventListener("DOMContentLoaded", main);