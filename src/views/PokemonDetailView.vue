<template>
  <!-- Plantilla para mostrar los detalles de un Pokémon -->
  <div v-if="pokemon" class="pokemon-detail">
    <!-- Si hay un Pokémon, mostrar los detalles -->
    <h1>{{ pokemon.name }}</h1> <!-- Nombre del Pokémon -->
    <img :src="pokemon.sprites.front_default" :alt="'Imagen de ' + pokemon.name" class="pokemon-image"/>
    <!-- Imagen del Pokémon -->
    <p><strong>Altura:</strong> {{ pokemon.height }}</p> <!-- Altura del Pokémon -->
    <p><strong>Peso:</strong> {{ pokemon.weight }}</p> <!-- Peso del Pokémon -->
    <p><strong>Tipo:</strong>
      <!-- Tipos del Pokémon -->
      <span v-for="(type, index) in pokemon.types" :key="index" class="pokemon-type">
        {{ type.type.name }}<span v-if="index < pokemon.types.length - 1">, </span>
        <!-- Mostrar cada tipo, separados por comas, excepto el último -->
      </span>
    </p>
    <p><strong>Habilidades:</strong>
      <!-- Habilidades del Pokémon -->
      <span v-for="(ability, index) in pokemon.abilities" :key="index" class="pokemon-ability">
        {{ ability.ability.name }}<span v-if="index < pokemon.abilities.length - 1">, </span>
        <!-- Mostrar cada habilidad, separadas por comas, excepto la última -->
      </span>
    </p>
    <p><strong>Movimientos:</strong>
      <!-- Movimientos del Pokémon -->
      <span v-for="(move, index) in displayedMoves" :key="index" class="pokemon-move">
        {{ move.move.name }}<span v-if="index < displayedMoves.length - 1">, </span>
        <!-- Mostrar los primeros diez movimientos, separados por comas, excepto el último -->
      </span>
    </p>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices'; // Importar el servicio para obtener datos de Pokémon
import { useRoute } from 'vue-router'; // Importar el gancho para obtener información de la ruta actual

export default {
  name: 'PokemonDetailView', // Nombre del componente

  data() {
    return {
      pokemon: null, // Almacena los detalles del Pokémon
      displayedMoves: [], // Almacena los movimientos del Pokémon que se mostrarán
      id: "" // Almacena el ID del Pokémon
    };
  },

  async created() {
    const route = useRoute(); // Obtener información de la ruta actual
    this.id = route.params.id; // Obtener el ID del Pokémon de los parámetros de la ruta

    // Obtener los detalles del Pokémon utilizando el servicio
    const pokemonData = await PokemonServices.getPokemonDetail(this.id);
    this.pokemon = pokemonData;

    // Si el Pokémon tiene movimientos, mostrar solo los primeros diez
    if (this.pokemon && this.pokemon.moves) {
      this.displayedMoves = this.pokemon.moves.slice(0, 10);
    }
  },
};
</script>

<style scoped>
/* Estilos CSS específicos para este componente */
.pokemon-detail {
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

/* Estilos para los encabezados y los diferentes detalles del Pokémon */
.pokemon-detail h1 {
  font-size: 2em;
  color: #333;
}

/* Estilos para la imagen del Pokémon */
.pokemon-image {
  width: 150px;
  height: auto;
  margin: 20px 0;
}

/* Estilos para los párrafos que muestran la altura, el peso y otros detalles */
.pokemon-detail p {
  font-size: 1.2em;
  color: #555;
}

/* Estilos para los tipos de Pokémon */
.pokemon-detail p strong {
  color: #333;
}

/* Estilos para los tipos de Pokémon */
.pokemon-type, .pokemon-ability, .pokemon-move {
  font-weight: bold;
  color: #444;
}

/* Estilos para los diferentes tipos de Pokémon */
.pokemon-type {
  background-color: #f5a623;
  border-radius: 5px;
  padding: 2px 5px;
  margin: 0 2px;
}

/* Estilos para las habilidades de Pokémon */
.pokemon-ability {
  background-color: #4a90e2;
  border-radius: 5px;
  padding: 2px 5px;
  margin: 0 2px;
}

/* Estilos para los movimientos de Pokémon */
.pokemon-move {
  background-color: #50e3c2;
  border-radius: 5px;
  padding: 2px 5px;
  margin: 0 2px;
}
</style>
