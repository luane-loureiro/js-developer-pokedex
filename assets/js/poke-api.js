const pokeApi = {}

function processNumber(number) {
    if (number >= 0 && number <= 9) {
        return `00${number}`
    } else if (number >= 10 && number <= 99) {
        return `0${number}` 
    } else {
        return number
    }
}

function processAltura (altura) {
    altura = altura/10;
    return altura;
}

function processPeso(peso) {
    peso = peso/10;
    return peso;
}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = processNumber(pokeDetail.id);
  pokemon.name = pokeDetail.name;
  pokemon.peso = processPeso(pokeDetail.weight);
  pokemon.altura = processAltura(pokeDetail.height);

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
  const [ability] = abilities;

  pokemon.abilities = abilities;
  pokemon.ability = ability;

  pokemon.stats.hp = pokeDetail.stats.find(
    (item) => item.stat.name === "hp"
  );

  pokemon.stats.atk = pokeDetail.stats.find(
    (item) => item.stat.name === "attack"
  );

  pokemon.stats.def = pokeDetail.stats.find(
    (item) => item.stat.name === "defense"
  );
  pokemon.stats.sAtk = pokeDetail.stats.find(
    (item) => item.stat.name === "special-attack"
  );

  pokemon.stats.sDef = pokeDetail.stats.find(
    (item) => item.stat.name === "special-defense"
  );
  pokemon.stats.spd = pokeDetail.stats.find(
    (item) => item.stat.name === "speed"
  );

  pokemon.photo = pokeDetail.sprites.other.home.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonByID = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => convertPokeApiDetailToPokemon(data));
};
