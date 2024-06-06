import { createRouter, createWebHistory } from 'vue-router'
import PokemonsListView from '../views/PokemonsListView.vue'
import PokemonDetailView from '../views/PokemonDetailView.vue'
import PokemonsGameView from '../views/PokemonsGameView.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: PokemonsListView
  },
  {
    path: '/detalle/:id',
    name: 'detalle',
    component: PokemonDetailView,
    props: true
  },
  {
    path: '/juego/',
    name: 'juego',
    component: PokemonsGameView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
