<template lang="html">

  <div class="ui secondary menu">
    <router-link
      to="/"
      class="ui item"
      active-class="active"
      exact
    >Home
    </router-link>

    <router-link
      v-if="is_login"
      to="articleform"
      class="ui itme"
      active-clas="active"
      exact
    >Write New</router-link>

    <div class="right menu">
      <router-link
        v-if="!is_login"
        to="signin"
        class="ui item"
        active-class="active"
        exact
      >Sign In</router-link>
      <router-link
        v-if="!is_login"
        to="signup"
        class="ui item"
        active-class="active"
        exact
      >Sign Up</router-link>

      <a class="ui item" v-if="is_login" @click="clickSignout">Sign Out</a>
    </div>
  </div>
</template>

<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: mapGetters({
    user: 'getUser',
    is_login: 'getLoginStatus'
  }),
  methods: {
    ...mapActions([
      'userSignout'
    ]),
    clickSignout() {
      console.log('clickSignout')
      this.userSignout()
    }
  },
  created() {

  }
}

</script>

<style media="screen">
</style>
