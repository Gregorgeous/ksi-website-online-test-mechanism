<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h3>Tutaj będzie licznik z czasem do końca: ....</h3>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <h4 style="text-decoration:underline">
          Oto lista pytań na które odpowiadasz:
        </h4>
      </v-flex>
    </v-layout>

    <v-layout class="mt-2">
      <v-flex>
        <v-card hover>
          <v-card-title primary-title>
                <p>Pytanie numer X</p>
                <h5>
                  W oparciu o statut ZHP, odpowiedz - czy komendant hufca ma prawo odwołac instruktora z funkcji bez żadnego uprzedzenia ?
                </h5>
                <v-divider></v-divider>
              </v-card-title>
              <v-card-actions>
                <v-flex offset-lg2 offset-md1>
                  <v-radio-group v-model="row" row>
                    <v-radio label="Tak" value="Tak" ></v-radio>
                    <v-radio
                    label="No CHYBA nie .."
                    value="No CHYBA nie ..">
                    </v-radio>
                    <v-radio
                    label="No CHYBA nie .."
                    value="No CHYBA nie ..">
                    </v-radio>
                    <v-radio
                    label="No CHYBA nie .."
                    value="No CHYBA nie ..">
                    </v-radio>
                  </v-radio-group>
                </v-flex>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      row: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
