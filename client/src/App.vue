<template>
  <div id="app">
    <div class="ui container">
      <navbar></navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {
    ...mapActions([
      'checkTokenfromLocalStorage',
      'fetchArticles'
    ])
  },
  created() {
    this.checkTokenfromLocalStorage()
    this.fetchArticles()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
