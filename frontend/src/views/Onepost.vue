<template>
  <div class="onepost">
    <loggedInHeader />
    <post />
  </div>
</template>

<script>
// @ is an alias to /src
import loggedInHeader from '@/components/loggedInHeader.vue'
import post from '@/components/post.vue'


export default {
  name: 'onepost',
  components: {
   loggedInHeader, post
  }
}
</script>
<style lang="scss">
.onepost{
   background-image: url('../assets/shutterstock_430168801.jpeg');
        background-size: cover;
        background-attachment: fixed;
        background-position:right;
        height: 100vh;
        overflow-y: scroll;
}
</style>