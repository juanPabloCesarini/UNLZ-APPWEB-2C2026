// URL base de la API
const API_URL = "https://pokeapi.co/api/v2/pokemon";

const container = document.getElementById("pokemonContainer");
const spinner = document.getElementById("spinner");
const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("pokemonInput");

// Mostrar y ocultar spinner
const showSpinner = () => spinner.classList.remove("d-none");
const hideSpinner = () => spinner.classList.add("d-none");

// Función para renderizar una card de Pokémon
const renderPokemon = (pokemon) => {
  const { name, sprites, types } = pokemon;
  const typeList = types
    .map((t) => `<span class="badge bg-secondary me-1">${t.type.name}</span>`)
    .join("");

  return `
    <div class="card shadow">
      <img src="${sprites.front_default}" class="card-img-top" alt="${name}">
      <div class="card-body text-center">
        <h5 class="card-title text-capitalize">${name}</h5>
        <p>${typeList}</p>
      </div>
    </div>
  `;
};

/**
 * Carga inicial de varios Pokémon usando async/await
 * 1️⃣ Hace un fetch a la lista de Pokémon.
 * 2️⃣ Luego, realiza varias peticiones en paralelo (Promise.all).
 */
const loadAllPokemons = async () => {
  try {
    showSpinner();
    container.innerHTML = "";
    container.classList.remove("justify-content-center");

    const response = await fetch(`${API_URL}?limit=20`);
    const data = await response.json();

    // Obtener todos los detalles de los Pokémon en paralelo
    const pokemonPromises = data.results.map(async (p) => {
      const res = await fetch(p.url);
      return res.json();
    });

    const pokemons = await Promise.all(pokemonPromises);

    container.innerHTML = pokemons
      .map(
        (p) => `
      <div class="col-md-3">${renderPokemon(p)}</div>
    `,
      )
      .join("");
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar los Pokémon.", "error");
  } finally {
    hideSpinner();
  }
};

/**
 * Búsqueda de un Pokémon por nombre usando async/await
 * 1️⃣ Toma el valor del input.
 * 2️⃣ Si está vacío, muestra alerta.
 * 3️⃣ Si no, busca en la API.
 */
const searchPokemon = async () => {
  const query = input.value.trim().toLowerCase();

  if (!query) {
    Swal.fire(
      "Atención",
      "Debes escribir un nombre antes de buscar.",
      "warning",
    );
    return;
  }

  try {
    showSpinner();
    container.innerHTML = "";
    container.classList.add("justify-content-center"); // centramos la card

    const response = await fetch(`${API_URL}/${query}`);

    if (!response.ok) throw new Error("Pokémon no encontrado");

    const pokemon = await response.json();

    // Envolvemos la card en una columna centrada
    container.innerHTML = `
      <div class="col-md-4 single-card">
        ${renderPokemon(pokemon)}
      </div>
    `;
  } catch (error) {
    Swal.fire("Error", `El Pokémon "${query}" no existe.`, "error");
  } finally {
    hideSpinner();
  }
};

// Eventos
document.addEventListener("DOMContentLoaded", loadAllPokemons);
searchBtn.addEventListener("click", searchPokemon);
