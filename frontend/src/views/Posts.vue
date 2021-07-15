<template>
  <div class="posts">
    <loggedInHeader />
    <newpost />
    <post />
  </div>
</template>

<script>
// @ is an alias to /src
import loggedInHeader from '@/components/loggedInHeader.vue'
import newpost from '@/components/newpost.vue'
import post from '@/components/post.vue'

export default {
  name: 'Posts',
  components: {
   loggedInHeader, post, newpost
  }
}
</script>
<style lang="scss">
.posts{
   background-image: url('../assets/shutterstock_430168801.jpeg');
        background-size: cover;
        background-attachment: fixed;
        background-position:right;
        height: 100vh;
}
</style>
