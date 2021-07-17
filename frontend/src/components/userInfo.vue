<template>
  <div class="userinfo">
      <section class="info">
          <h1>Bonjour {{ username }} ! </h1><br>
          <button class="deletebutton" @click="deleteAccount">Supprimer le compte</button>

      </section>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
    name: 'userinfo',
    data() {
        return{
    username : "",
        }
    },
    mounted() {
        this.username = localStorage.getItem("userName");
    },
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
.userinfo{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}
.info{
    border: 1px solid #0F1E41; 
    background-color: white;
    box-shadow: 1px 1px 5px #0F1E41;
    padding: 40px;
    margin: 40px;
    margin-top: 40px;
    display:flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    width: 350px;
    min-height: 180px;
    max-height: 500px;
}
    
.deletebutton{
            height: 30px;
            border-radius: 5px;
            background-color: lighten(lightgrey, 10%);
            border: 1px solid #0F1E41;
            margin-top: 10px;
            transition: transform, 300ms, ease;
            &:hover{
                background-color: #C2595E;
                cursor: pointer;
                color: white;
                border: 1px solid black;

            }
    
}
</style>