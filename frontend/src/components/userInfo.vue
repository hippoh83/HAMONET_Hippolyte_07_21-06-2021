<template>
  <div class="userinfo">
      <section class="info">
          <h1>Bonjour ! </h1><br>
          <button class="deletebutton" @click="deleteAccount">Supprimer le compte</button>

      </section>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
    name: 'userinfo',
    methods: {
        deleteAccount(){
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('userId')
        
        axios.delete('http://localhost:3000/api/auth/' + id, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(() => {
                    localStorage.clear();
                    this.$router.push('/signup');  
            })
            .catch(error => {
                console.log( error )
            })
        }
    }
}
</script>

<style lang="scss">
.deletebuton{
    border: 1px solid blue;
    background-color: blue;
    padding: 5px;
    width: 20px;
}
</style>