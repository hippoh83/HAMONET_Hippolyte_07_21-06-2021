<template>
  <div class="Posts">
    <loggedInHeader />
    <newpost />
    <allposts />
  </div>
</template>

<script>
// @ is an alias to /src
import loggedInHeader from '@/components/loggedInHeader.vue'
import newpost from '@/components/newpost.vue'
import allposts from '@/components/AllPosts.vue'

export default {
  name: 'Posts',
  components: {
   loggedInHeader, allposts, newpost
  }
}
</script>
<style lang="scss">
.Posts{
    background-image: url('../assets/shutterstock_430168801.jpeg');
        background-size: cover;
        background-attachment: fixed;
        background-position:right;
        height: 100vh;
   overflow-y: scroll;
}
</style>
