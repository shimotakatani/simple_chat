// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    messages: [],
    todos: [
      { id: 1, text: 'Первая задача', done: true },
      { id: 2, text: 'Сделать чатик', done: false }
    ]
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    addMessage (state, payload){
      state.todos.push(payload);
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  computed: {
    count () {
      return store.state.count
    }
  }
})

