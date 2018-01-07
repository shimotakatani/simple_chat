import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: App
    }
  ]
})
