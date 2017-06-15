<template lang="html">
  <div class="ui form" @submit.prevent="submitSignin">
    <div class="field">
      <label>Username</label>
      <input type="text" name="username" placeholder="Username..." v-model="userForm.username">
    </div>
    <div class="field">
      <label>Password</label>
      <input type="text" name="password" placeholder="Password..." v-model='userForm.password'>
    </div>
    <button type="button" name="button" class="ui button">Log In</button>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default{
    data() {
      return {
        userForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapactions([
        'userSignin'
      ]),
      submitSignin() {
        console.log("submitSignin");
        console.log(this.userForm);

        this.userSignin(this.userForm)
        this.$router.push('/')
      }
    }
  }
</script>

<style media="screen">

</style>
