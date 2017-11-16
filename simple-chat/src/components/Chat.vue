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
    mounted: function () {
      this.webSocket = new WebSocket('ws://localhost:4567/chat/')
      this.webSocket.onmessage = function (msg) {
        debugger
        document.getElementById('chat').$emit('receiveMessage', msg)
      }
      this.webSocket.onclose = function () { alert('WebSocket connection closed') }
    },
    methods: {
      sendMessage: function () {
        this.webSocket.send(ChatControls.message)
      },
      receiveMessage: function (msg) {
        let data = JSON.parse(msg.data)
        globalData.messages.unshift({
          userName: data.sender,
          message: data.userMessage,
          time: data.timestamp
        })
        globalData.users = data.userlist
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
