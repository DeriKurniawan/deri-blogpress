<template>
  <div id="app">
    <div class="ui container">
      <navbar></navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'

import {mapGetters, mapGetters} from 'vuex'
export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {
    ...mapActions([])
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
