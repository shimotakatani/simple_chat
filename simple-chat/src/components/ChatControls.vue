<template>
  <div id="chatControls">
    <input v-model="message" placeholder="Type your message" @keydown.enter="sendMessage">
    <button v-on:click="sendMessage">Send</button>
  </div>
</template>

<script>
  export default {
    name: 'chatControls',
    data () {
      return {
        message: ''
      }
    },
    methods: {
      sendMessage: function () {
        if (this.message !== '') {
          this.$emit('sendMessage')
          this.message = ''
        }
        this.$store.commit('increment')
      }
    }

  }
</script>

<style>

</style>
