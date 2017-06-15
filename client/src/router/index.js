import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Navbar from '@/components/Navbar'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import ArticleForm from '@/components/ArticleForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/articleform',
      name: 'Write',
      component: Articleform
    }
  ]
})
