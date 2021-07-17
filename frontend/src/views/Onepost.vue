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
   background-color: lighten(#0F1E41, 45%) ;
   height: 100vh;
   overflow-y: scroll;
}
</style>