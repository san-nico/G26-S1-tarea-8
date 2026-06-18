let numpagina = 1;
const api_root = "https://rickandmortyapi.com/api/character/";
const mainholder = document.getElementById("mainholder");
const btn_izquierda = document.getElementById("btn-izquierda");
const btn_derecha = document.getElementById("btn-derecha");
const btn_input = document.getElementById("btn-input");
const cache = new Map();

async function get_characters(pagina) {
    const url = `${api_root}?page=${pagina}`;
    const cached = localStorage.getItem(url);
    if (cached) {
        return JSON.parse(cached);
    }
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem(url, JSON.stringify(data.results));
    return data.results;
}
function characterTemplate(element) {
    const template = document.getElementById("character-template").innerHTML;
    return template
        .replace(/{{name}}/g, element.name)
        .replace(/{{image}}/g, element.image)
        .replace(/{{species}}/g, element.species)
        .replace(/{{gender}}/g, element.gender)
        .replace(/{{location}}/g, element.location.name)
        .replace(/{{status}}/g, element.status)
        .replace(/{{origin}}/g, element.origin.name)
        ;
}
async function mainController() {
    const hash = window.location.hash.slice(1); // "pagina=3"
    const params = new URLSearchParams(hash);
    const pagina = params.get("pagina");
    console.log('triggeado cambio de hash', pagina)
    if (pagina) {
        numpagina = parseInt(pagina, 10);
        btn_input.value = numpagina;
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
async function cambiarpagina(pagina) {
    btn_input.value = pagina;
    window.location.hash = `pagina=${numpagina}`;
}
async function main() {
    btn_izquierda.addEventListener("click", () => {
        if (numpagina > 1) {
            numpagina -= 1;
            cambiarpagina(numpagina);
        }
    });
    btn_derecha.addEventListener("click", () => {
        numpagina += 1;
        cambiarpagina(numpagina);
    });
    mainController();
}
window.addEventListener("hashchange", mainController);
window.addEventListener("DOMContentLoaded", main);