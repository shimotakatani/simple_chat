<template>
  <div id="chat">
    <ChatControls @sendMessage="sendMessage"/>
    <ChatMessage v-bind:messages="messages"/>
    <UserList v-bind:users="users"/>
  </div>
</template>
<script>
  import ChatControls from './ChatControls.vue'
  import ChatMessage from './ChatMessage.vue'
  import UserList from './UserList.vue'
  import VueWebsocket from '../../node_modules/vue-websocket';
  import Vue from 'vue'

  Vue.use(VueWebsocket, 'ws://localhost:4567/chat/')
  let globalData = {
    messages:[]
  }

  export default {
    name: 'chat',
    components: {
      ChatControls,
      ChatMessage,
      UserList
    },
    data () {
      return {
        //webSocket: null,
        users: ['User'],
        messages: [
          {
            message: 'How are you?',
            userName: 'Someone',
            time: '14:00:00'
          }
        ]

      }
    },
    methods: {
      sendMessage: function () {
        this.webSocket.send(ChatControls.message)
      },
      receiveMessage: function (msg) {
        let data = JSON.parse(msg.data)
        this.messages.unshift({
          userName: data.sender,
          message: data.userMessage,
          time: data.timestamp
        })
        this.users = data.userlist
      }
    },
    socket: {
      // Prefix for event names
      // prefix: "/counter/",

      // If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
      // namespace: "/counter",

      events: {

        // Similar as this.$socket.on("changed", (msg) => { ... });
        // If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
        //
        changed(msg) {
          this.receiveMessage(msg);
        },

        connect() {
          console.error("WebSocket connect")
        },

        disconnect() {
          console.error("WebSocket connection closed")
        },

        error(err) {
          console.error("Websocket error!", err);
        }


      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
