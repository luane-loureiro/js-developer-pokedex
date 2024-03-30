const pokemonList = document.getElementById('pokemonList')

function convertPokemonToLi(pokemon) {
    return `
    <div class="container">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img class="imgPrincipal" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
        <details>
        <p>Altura: ${pokemon.altura} m</p>
        <p>Peso: ${pokemon.peso} Kg</p>
        <ul class="stats-container">
        <div class="title"> <hr> Status <hr> </div>
        ${Object.entries(pokemon.stats)
          .map(
            ([statName]) =>
              `<li class='stats'>
            <p>${statName}</p>
            <p>${pokemon.stats[statName].base_stat}</p>
            <span class='progress-bar dark'>
            <span style="width: ${
              pokemon.stats[statName].base_stat > 100
                ? 100
                : pokemon.stats[statName].base_stat
            }%" 
                class='progress ${pokemon.type}'/></span>
        </li>`
          )
          .join("")}
        </details>
    </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
    })
}

loadPokemonItens(0, 151)
