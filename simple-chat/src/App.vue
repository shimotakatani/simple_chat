<template>
  <div id="app">
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <p>Всего сообщений: {{ doneTodosCount }}</p>
    <input v-model="message" placeholder="Type your message" @keydown.enter="addMessage">
    <p><button @click="addMessage">Добавить сообщение</button></p>
    <ol>
      <li v-for="msg in messages">
        <b> {{ msg.id }} says : </b>
        <p>{{ msg.text }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      message: ''
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    messages () {
      return this.$store.getters.doneTodos
    },
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    },
    addMessage () {
      if (this.message !== '') {
        this.$store.dispatch('sendMessage', {id:3, text: this.message, done: true})
        this.message = ''
      }

    }
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
