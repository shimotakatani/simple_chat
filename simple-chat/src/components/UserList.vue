<template>
  <div id="userlist">
    <ul>
      <li v-for="user in users">
        <p>{{ user }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'userlist',
    props: ['users']
  }
</script>

<style>

</style>
