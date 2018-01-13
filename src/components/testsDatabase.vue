<template>
  <div >

<v-layout>
 <v-flex class="text-xs-left">
  <v-btn  flat depressed class="pl-0 text-xs-left " id="backbutton"  to='/admin-dashboard'>
    <i class="fa fa-chevron-left" aria-hidden="true"></i>
    <span class="ml-2">
      panel administratora
    </span>
  </v-btn>
</v-flex>
<v-flex xs12>
  <v-card id="titleCard" class="">
    <v-card-title >
      <h5  class="headline mb-0 text-xs-center">
        Baza danych testów
      </h5>
    </v-card-title>
  </v-card>
</v-flex>
</v-layout>
<v-divider></v-divider>

  <v-layout v-if="ThereIsFatalError">
    <v-dialog v-model="ThereIsFatalError" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">Nastąpił błąd połączenia z bazą danych online</div>
        </v-card-title>
        <v-card-text>Spróbuj odświeżyc stronę. Jeśli błąd będzie się dalej powtarzac, zmień przeglądarkę na dowolną inną niż ta, której obecnie używasz. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

  <v-layout v-else>
    
  </v-layout>

</div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    thisCandidate(){
      return this.$store.state.candidateDetails;
    },
    ThereIsFatalError(){
      return this.$store.state.fatalError;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
