let numpagina = 1;
const api_root = "https://rickandmortyapi.com/api/character/";
const mainholder = document.getElementById("mainholder");
const btn_izquierda = document.getElementById("btn-izquierda");
const btn_derecha = document.getElementById("btn-derecha");
const btn_input = document.getElementById("btn-input");
const char_template = document.getElementById("character-template").innerHTML;
const row_template = document.getElementById("row-template").innerHTML;
const cache = new Map();

async function get_characters(pagina) {
    const url = `${api_root}?page=${pagina}`;
    try {
        const cached = localStorage.getItem(url);
        if (!cached) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            localStorage.setItem(url, JSON.stringify(data.results));
            return data.results;
        }
        return JSON.parse(cached);
    } catch (error) {
        console.error("Error al obtener personajes:", error);
        return [];
    }
}
function rowTemplate(element) {
    return row_template
        .replaceAll("{{eje}}", element.eje)
        .replaceAll("{{label}}", element.label)
        .replaceAll("{{campo}}", element.campo)
        .replaceAll("{{modificador}}", element.modificador)
        .replaceAll("{{valor}}", element.valor);
}

function characterTemplate(element) {
    const data = {
        name: {
            eje: "izquierda",
            campo: "name",
            label: "Nombre",
            modificador: "name--" + element.name.toLowerCase(),
            valor: element.name
        },
        species: {
            eje: "izquierda",
            campo: "species",
            label: "Especie",
            modificador: "species--" + element.species.toLowerCase(),
            valor: element.species
        },
        gender: {
            eje: "derecha",
            campo: "gender",
            label: "Género",
            modificador: "gender--" + element.gender.toLowerCase(),
            valor: element.gender
        },
        location: {
            eje: "derecha",
            campo: "location",
            label: "Ubicación",
            modificador: "",
            valor: element.location.name
        },
        status: {
            eje: "izquierda",
            campo: "status",
            label: "Estado",
            modificador: "status--" + element.status.toLowerCase(),
            valor: element.status
        },
        origin: {
            eje: "derecha",
            campo: "origin",
            label: "Origen",
            modificador: "",
            valor: element.origin.name
        }
    };

    let html=char_template;
    Object.values(data).forEach((item) => {
        html = html.replaceAll(
            `{{row-${item.campo}}}`,
            rowTemplate(item)
        );
    });

    
    return html // no se procesando los replace all
        .replaceAll("{{image}}", element.image)
        .replaceAll("{{status}}", element.status)
        .replaceAll("{{gender}}", element.gender);

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
    let datos = await get_characters(indice);
    mainholder.innerHTML = "";
    if (datos.length === 0) {
        mainholder.innerHTML = "<p>Error al cargar personajes. Intenta nuevamente.</p>";
        return;
    }
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