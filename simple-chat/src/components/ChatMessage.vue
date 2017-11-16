<template>
  <!--//<div id="chatMessage">-->
    <ol>
      <li v-for="msg in messages">
        <b> {{ msg.userName }} says : </b>
        <p>{{ msg.message }}</p>
        <span class="timestamp">{{ msg.time }}</span>
      </li>
    </ol>
 <!--// </div>-->
</template>

<script>
  export default {
    //name: 'chatMessage',
    props: ['messages']
  }
</script>

<style>

</style>
