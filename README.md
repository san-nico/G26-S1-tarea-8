# Rick & Morty Character Explorer

Aplicación web que consume la API de Rick & Morty para explorar personajes de la serie mediante una interfaz interactiva.

## Características

* Visualización de personajes en tarjetas.
* Navegación entre páginas de resultados.
* Persistencia de la página actual mediante URL hash.
* Información detallada de cada personaje:

  * Nombre
  * Imagen
  * Estado
  * Género
  * Especie
  * Origen
  * Ubicación actual
* Caché local usando LocalStorage para optimizar las consultas.
* Diseño responsivo para distintos tamaños de pantalla.

## Tecnologías

* HTML5
* CSS3
* JavaScript (Vanilla)
* Rick & Morty API
* LocalStorage

## Instalación

```bash
git clone https://github.com/san-nico/G26-S1-tarea-8.git
cd G26-S1-tarea-8
npm install
npm run dev
```

## API

Endpoint utilizado:

```txt
https://rickandmortyapi.com/api/character/?page={n}
```

## Demo

https://san-nico.github.io/G26-S1-tarea-8