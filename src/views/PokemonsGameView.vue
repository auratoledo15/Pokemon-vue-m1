    <template>
        <div class="row">
            <div class="col-sm-12 d-flex justify-content-center">
                <h3 class="text-primary">¿Quien es este Pokemon?</h3>
            </div>
        </div>
        <div v-if="!loading">
            <div class="row">
                <div class="col-sm-10 d-flex justify-content-center">
                    <div class="container-image">
                        <img 
                        v-if="!showResult"
                        class="hidden-image"
                        :src="correct.image"
                        alt=""
                        />
                        <img v-if="showResult" :src="correct.image" alt="" />
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div 
                    v-for="option in pokemons" :key="option.id"
                    class="col-sm-6 d-flex justify-content-center"
                >
                    <button
                        class="btn btn-primary mt-2 btn-option"
                        :disabled="disabledOptions"
                        @click="validateCorrect(option.id)"
                    >
                        {{ option.name }}
                    </button>
                </div>
            </div>
            <div v-if="showResult">
    <div class="row"> 
        <div v-if="result" class="col-sm-12 d-flex justify-content-center">
            <h4 class="text-success">Correcto!!</h4>
        </div>
        <div v-else class="col-sm-12 d-flex justify-content-center">
            <h4 class="text-danger">Incorrecto!!</h4>
        </div>
    </div>
    <div class="row">
        <div v-if="showResult" class="col d-flex justify-content-center">
            <h4> El pokemon es {{ correct.name.toUpperCase() }}</h4>
        </div>
    </div>
</div>
            <div v-if="showResult" class="row">
                <div class="col">
                    <button class="btn btn-success btn-option" @click="getPokemonList()">
                        Volver a Intentarlo
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row d-flex justify-conten-center aling-items-center container-loader">
                <h4>
                    Cargando...
                </h4>
            </div>
        </div>
    </template>

    <script>
    import PokemonServices from '@/services/PokemonServices'
    export default {
        name: "PokemonGameView",
        data() {
            return {
                pokemons:[],
                pos: -1,
                correct: {},
                showResult: false,
                result: false,
                disabledOptions: false,
                loading: true,
            };
        },
        mounted() {
            this.getPokemonList();
        },
        methods: {
            async getPokemonList() {
                this.loading = true
                this.disabledOptions = false;
                this.showResult = false;
                this.pokemons = await PokemonServices.getPokemonListForGame();
                setTimeout(async () =>{
                    this.pos = await Math.floor(Math.random() * 4);
                    this.correct = this.pokemons[this.pos];
                    this.loading = false
                }, 1000);
            },
            async validateCorrect(id) {
                if(id == this.correct.id) {
                this.result = true;
            } else {
                this.result = false;
            }
                this.disabledOptions = true;
                this.showResult = true;
            }   
        },
    };

    </script>

    <style lang="scss" scoped>
    .container-image {
        img {
            max-height: 180px;
        }
        .hidden-image{
            filter: brightness(0);
        }
    }
    .btn-option{
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    .container-loader{
        width: 100%;
        height: 100%;
    }
    </style>