import axios from 'axios'
async function idsForGames() {
    let list = [];
    for(let i = 0; i<=3; i++){
        list[i] = Math.floor(Math.random() * 649) + 1
    }
    return list
}
export default {
    async getPokemons() {
        return await axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(response =>{
            return response.data.results
        })
        .catch(
            error => {
                console.log(error)
            } 
        )
    },
    async getPokemonDetail(name) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response =>{
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    async getPokemonList(start,end){
        let gottenPokemons = []
        for(let i = start; i<= end; i ++){
            const itemPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
            })
        
            const addedPokemon = {
                id: itemPokemon.id,
                name: itemPokemon.name,
                image: itemPokemon.sprites.other.dream_world.front_default
            }
        
            gottenPokemons.push(addedPokemon)
        }
        return gottenPokemons;
    },

    async getPokemonListForGame() {
        const list = await idsForGames();
        let pokemons = [];
        list.forEach(async (element) => {
            const gottenPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/${element}`)
            .then(response =>{
                return response.data
            })
            .catch(error =>{
                console.log(error)
            })
            let pokemon = {
                id: gottenPokemons.id,
                name:gottenPokemons.name,
                image: gottenPokemons.sprites.other.dream_world.front_default,
            }
            pokemons.push(pokemon)
        });
        return pokemons;
    }
    
}

