<template lang="html">
  <form class="ui form" @submit.prevent="submitSignup">
    <div class="field">
      <label>Full Name</label>
      <input type="text" name="full-name" placeholder="Fullname.." v-model="userForm.name">
    </div>
    <div class="field">
      <label>Username</label>
      <input type="text" name="username" placeholder="Username.." v-model="userForm.username">
    </div>
    <div class="field">
      <label>Email</label>
      <input type="text" name="email" placeholder="Email.." v-model="userForm.email">
    </div>
    <div class="field">
      <label>Password</label>
      <input type="text" name="password" placeholder="Password..." v-model="userForm.password">
    </div>
  </form>
</template>

<script type="text/javascript">
  import {mapActions} from 'vuex'

  exports.default{
    data () {
      return {
        userForm: {
          name: '',
          username: '',
          email: '',
          password:''
        }
      }
    },
    methods: {
      ...mapActions([
        'userSignup'
      ]),
      submitSignup() {
        console.log("submitSignup");
        this.userSignup(this.userForm);
      }
    }
  }
</script>

<style media="screen">
</style>
