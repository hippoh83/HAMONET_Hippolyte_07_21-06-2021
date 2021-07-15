<template>
  <div class="signup">
    <Header />
    <Signup />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'signup',
  components: {
    Header, Signup
  }
}
</script>
<style lang="scss">
.signup{
   background-image: url('../assets/shutterstock_430168801.jpeg');
        background-size: cover;
        background-attachment: fixed;
        background-position:right;
        height: 100vh;
}
</style>