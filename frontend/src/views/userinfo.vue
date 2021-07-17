<template>
  <div class="userInfo">
    <loggedInHeader />
    <userinfo />
  </div>
</template>

<script>
// @ is an alias to /src
import loggedInHeader from '@/components/loggedInHeader.vue'
import userinfo from '@/components/userInfo.vue'

export default {
  name: 'userInfo',
  components: {
   loggedInHeader, userinfo
  }
}
</script>
<style lang="scss">
.userInfo{
  background-image: url('../assets/shutterstock_430168801.jpeg');
        background-size: cover;
        background-attachment: fixed;
        background-position:right;
        height: 100vh;
   overflow-y: scroll;
}
</style>
