<template>
  <v-layout>
    <v-flex xs12  md2 offset-md5 sm3 offset-sm4>
      <v-card class="mp-5 mt-5">
        <v-card-title primary-title>
          <v-flex>
            <div >
              <h3 class="headline ">Rozpocznij test</h3>
              <hr>
              <div>Test będzie trwac X minut.</div>
              <div>Test będzie składac się z X pytań</div>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-flex>
            <v-btn flat class="orange--text" to='/question-form'>
              Rozpocznij
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      drawer: false
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
v-card{
  margin-top: 50%
}
</style>
