// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
const socket = new WebSocket("ws://localhost:4567/chat")

const store = new Vuex.Store({
  socket: socket,
  state: {
    count: 0,
    messages: [],
    todos: [
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
  actions: {
    sendMessage ({commit}, message){
      //send to server
      commit('increment')
      commit('addMessage', message)
      socket.send(message)
    },
    increment ({ commit }){
      commit('increment')
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
  },
  methods: {
    add() {
      // Emit the server side
      this.$socket.emit("add", { a: 5, b: 3 });
    },

    get() {
      this.$socket.emit("get", { id: 12 }, (response) => {

      });
    },
    send() {
      this.$socket.send('some data')
      // or with {format: 'json'} enabled
      this.$socket.sendObj({awesome: 'data'})
    }

  }

})

socket.onopen = function() {
  store.commit('addMessage',  {id: 'system', text: 'Соединение установлено.', done: true} );
};

socket.onclose = function(event) {
  if (event.wasClean) {
    store.commit('addMessage',  {id: 'system', text: 'Соединение закрыто чисто', done: true} );
  } else {
    store.commit('addMessage',  {id: 'system', text: 'Обрыв соединения', done: true} );
  }
  store.commit('addMessage',  {id: 'system', text: 'Код: ' + event.code + ' причина: ' + event.reason, done: true} );
};

socket.onmessage = function(event) {
  store.commit('addMessage',  event.data );
};

socket.onerror = function(error) {
  alert("Ошибка " + error.message);
};
