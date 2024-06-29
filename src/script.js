let todosPokemons = [];
let indiceAtual = 0;

async function buscarTodosPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292';
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        todosPokemons = dados.results;
        exibirPokemon(indiceAtual);
    } catch (erro) {
        console.error('Erro ao buscar todos os Pokémons:', erro);
    }
}

async function buscarDadosPokemon(pokemon) {
    const url = pokemon.url;
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro ao buscar dados do Pokémon:', erro);
    }
}

function traduzirHabilidade(nome) {
    const traducoes = {
        "hp": "HP",
        "attack": "Ataque",
        "defense": "Defesa",
        "special-attack": "Ataque Especial",
        "special-defense": "Defesa Especial",
        "speed": "Velocidade"
    };
    return traducoes[nome] || nome;
}

async function exibirPokemon(indice) {
    const pokemon = todosPokemons[indice];
    const dados = await buscarDadosPokemon(pokemon);
    
    changeText('name', dados.name.toUpperCase());
    changeImage('img_sprite_front_default', dados.sprites.front_default);
    
    const listaHabilidades = document.getElementById('habilidades');
    listaHabilidades.innerHTML = dados.stats.map(stat => 
        `<li>${traduzirHabilidade(stat.stat.name)}: ${stat.base_stat}</li>`).join('');
}

function pokemonAnterior() {
    indiceAtual = (indiceAtual === 0) ? todosPokemons.length - 1 : indiceAtual - 1;
    exibirPokemon(indiceAtual);
}

function proximoPokemon() {
    indiceAtual = (indiceAtual === todosPokemons.length - 1) ? 0 : indiceAtual + 1;
    exibirPokemon(indiceAtual);
}

function changeImage(id, url) {
    document.getElementById(id).src = url;
}

function changeText(id, text) {
    document.getElementById(id).innerText = text;
}

buscarTodosPokemons();
