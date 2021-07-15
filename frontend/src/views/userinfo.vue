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