import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex, axios);

const store = new Vuex.store({
  state: {
    router,
    message: 'Hello You',
    user: {
      _id: null,
      name: '',
      username: '',
      token: ''
    },
    is_login: false,
    articles: [{author: {name: '', username: ''}}]
  },
  getters: {
    getMessage(state) {
      return state.message
    },
    getUser(state) {
      return state.user
    },
    getLoginStatus(state) {
      return state.is_login
    },
    getArticles(state) {
      return state.articles
    }
  },
  mutations: {
    setSigninStuff(state) {
      state.user._id = localStorage._id
      state.user.name = localStorage.name
      state.user.username = localStorage.username
      state.user.token = localStorage.token
      state.is_login = true
      console.log('setSigninStuff', state.user);
    },
    clearSigninInfo(state) {
      state.user = {
        _id: null,
        name: '',
        username: '',
        token: ''
      }
      state.is_login = false
      console.log('clearSigninInfo', state.user);
    },
    setArticles(state, data) {
      state.articles = data
      console.log('setArticles', state.articles);
    },
    addArticle(state, data) {
      state.articles.push(data)
      console.log('addArticle', state.articles);
    },
    updateArticle(state, data) {
      var index = state.articles.findIndex( a => a._id === data._id )

      if(index != 1) {
        state.articles.splice(index, 1, data)
      }
    },
    deleteArticle(state, data) {
      var index = state.articles.findIndex( a => a._id === data._id )

      if(index != 1){
        state.articles.splice(index, 1, data)
      }
    }
  },
  actions: {
    userSignin({commit}, user) {
      let self = this
      axios.post('http://localhost:3000/user/signin', {
        username: user.username,
        password: user.password
      })
      .then( response => {
        console.log("*** userSignin")
        console.log(response.data)

        console.log("typeof response.data", typeof response.data)
        // if(typeof response.data )

        // set to localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('_id', response.data._id)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('username', response.data.username)

        commit('setSigninStuff')
      })
      .catch( err => {
        console.log(err)
        alert('Sign in error')
      })
    },
    userSignup({commit}, user) {
      axios.post('http://localhost:3000/user/signup', {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
      })
      .then( response => {
        console.log("*** userSignup")
        console.log(response.data)

      })
      .catch( err => {
        console.log(err)
      })
    },
    checkTokenfromLocalStorage({commit}) {
      if(localStorage.token != null){
        commit('setSigninStuff')
      }
    },
    userSignout({commit}) {
      console.log('userSignout')


      localStorage.removeItem('token');
      localStorage.removeItem('_id');
      localStorage.removeItem('name');
      localStorage.removeItem('username');

      commit('clearSigninInfo')
    },
    fetchArticles({commit}) {
      axios.get('http://localhost:3000/api/articles')
      .then( response => {
        console.log("*** fetchArticles", response.data)

        commit('setArticles', response.data)
      })
    },
    saveArticle({commit}, article) {
      let self = this
      if(article._id != null) {
        // update
        axios.put(`http://localhost:3000/api/articles/${article._id}`, {
          title: article.title,
          content: article.content,
          category: article.category
        }, {
          headers: {token: localStorage.token }
        })
        .then( response => {
          console.log("*** updateArticle")
          console.log(response.data)

          commit('updateArticle', response.data)

        })
        .catch( err => {
          console.log(err)
        })
      }
      else {
        // create new article
        axios.post('http://localhost:3000/api/articles', {
          title: article.title,
          content: article.content,
          category: article.category
        }, {
          headers: {token: localStorage.token }
        })
        .then( response => {
          console.log("*** writeNewArticle")
          console.log(response.data)

          commit('addArticle', response.data)
        })
        .catch( err => {
          console.log(err)
        })
      }
    },
    deleteArticle({commit}, article) {

      axios.delete(`http://localhost:3000/api/articles/${article._id}`, {
        headers: {token: localStorage.token }
      })
      .then( response => {
        console.log("*** deleteArticle")
        console.log(response.data)

        commit('deleteArticle', response.data)
      })
      .catch( err => {
        console.log(err)
      })
    }
  }
})

export default store
