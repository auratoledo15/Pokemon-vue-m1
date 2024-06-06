<template>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h3 class="text-primary">Listado de Pokemon</h3>
      </div>
    </div>
    <div v-if="pokemons.length > 0">
      <div class="row-d-flex-justify-content-center">
        <div v-for="pokemon in pokemons" :key="pokemon.name" class="col-sm-8">
          <div class="card card-pokemon" @click="goToDetail(pokemon.id)" >
            <div class="card-image"> 
              <img :src="pokemon.image" alt="" width="100px" />
            </div>
            <div class="mt-3 card-title"> 
              <h4>
                {{ pokemon.name }}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons-pager"> 
        <button class="btn btn-primary ml-3" @click="previosPage()">
          Anterior
        </button>
        <button class="btn btn-primary" @click="nextPage()">
          Siguiente
        </button>
      </div>
    </div>
    <div v-else class="container-loader d-flex justify-content-center align-items-center">
      <h3>
        Cargando...
      </h3>
    </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
  name: 'PokemonListView',
  components: {},
  data() {
    return {
      pokemons: [], 
      page: 0,
      start: 1,
      end: 10,
    };
  },
  async created() {
    this.getpokemonsList (this.start, this.end);
      console.log(this.pokemons);
    },
    methods: {
      async getpokemonsList (start, end) {
        this.pokemons = await PokemonServices.getPokemonList(start, end);
      },
      async nextPage() {
        if (this.page < 65) {
          this.pokemons = [];
          this.page = this.page + 1;
          this.start = this.page * 10 + 1;
          this.end = (this.page + 1) * 10;
          await this.getpokemonsList(this.start, this.end);
        }
      },
      async previosPage() {
        if (this.page > 0) {
          this.pokemons = [];
          this.page = this.page - 1;
          this.start = this.page * 10 + 1;
          this.end = (this.page + 1) * 10;
          await this.getpokemonsList(this.start, this.end);
        }
      },
      goToDetail(pokemonId) {
        console.log(pokemonId)
        this.$router.push({
          name: 'detalle',
          params: {
            id: pokemonId
          }
        })
      }
    },
  };
</script>
<style lang="scss" scoped>
.card-pokemon{
  width: 80%;
  margin-left: 10%;
  margin-bottom: 2%;
  padding: 5%;
}
.buttons-page{
  display: flex;
  margin-left: 10%;
}
</style>