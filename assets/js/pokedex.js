const pokemonList = document.getElementById("pokemonList");
const pokedexDeviceScreen = document.getElementById("pokedex-device-screen");

const maxRecords = 151;
const limit = 151;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="miniContainer">
            <img src="${pokemon.photo}"
            alt="${pokemon.name}" onClick=getPokemon("${pokemon.name}")>
        </li>
    `;
}

function convertPokemonToCard(pokemon) {
  return `
        <div class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="card-detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </div>
      `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

function getPokemon(pokemonName) {
  pokeApi.getPokemonByName(pokemonName).then((pokemon = []) => {
    const newHtml = convertPokemonToCard(pokemon);
    pokedexDeviceScreen.innerHTML = newHtml;
  });
}
