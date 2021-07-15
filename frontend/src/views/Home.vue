<template>
  <div class="home">
    <Header />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Header, Login
  }
}
</script>
<style lang="scss">
.home{
   background-image: url('../assets/shutterstock_430168801.jpeg');
        background-size: cover;
        background-attachment: fixed;
        background-position:right;
        height: 100vh;
}
</style>