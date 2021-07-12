const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromisses = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(result => result.json()))
const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons;
}

const generateHTML = pokemons => pokemons.reduce((acc, { name, id, types }) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)
  acc += `
        <li class="card ${elementTypes[0]}">
          <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
          <h2>${id}. ${name}</h2>
          <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>`
  return acc
}, '');

const pokemonPromisses = generatePokemonPromisses();
Promise.all(pokemonPromisses)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
