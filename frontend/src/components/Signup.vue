<template>
    <div class="login">
        <div class="loginform">
            <h1>Inscription</h1>
    <form @submit.prevent = signup()>
        <input class="form email" required type="text" placeholder="email" v-model="email" />
        <input class="form password" required type="text" placeholder="Mot de passe" v-model="password" />
        <button class="buttonlogin" type="submit">Inscription</button> <br>
        <p class="error"></p>
    </form>
    <router-link to="/" class="buttonsignup">
    Vous avez déjâ un compte ? Connectez-vous !
    </router-link>
    </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      
    };
  },
  methods: {
    signup() {
      
      const email = this.email;
      const password = this.password;
      
      if ( password.length > 0) {
        axios.post("http://localhost:3000/api/auth/signup",
            {
              
              email,
              password,
            },
            {
                header: {
                "Content-Type": "application/json",
                },
            }
        )
        .then(() => {
            alert("Félicitation ! Vous venez de vous inscrire !")
            this.$router.push('/login')
            }) 
        .catch(error => {
        document.getElementsByClassName("error").innerHTML = `${error}`;
      });
      }
    },
  },
};

</script>
<style lang="scss">

.login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
.loginform{
    border: 1px solid #0F1E41;
    
    background-color: #0F1E41;
    padding: 15px;
    margin: 10px;
    margin-top: 40px;
    
    border-radius: 5px;
    width: 350px;
    height: 300px;
    h1{
        color: white;
        font-size: 22px;
        text-align: center;
        padding-bottom: 10px;
    }
    form{
        display: flex;
        flex-direction: column;
        .form{
            height: 30px;
            border-radius: 5px;
            background-color: white;
            border: 1px solid white;
            margin-top: 10px;
        }
        .buttonlogin {
            height: 30px;
            border-radius: 5px;
            background-color: white;
            border: 1px solid white;
            margin-top: 10px;
            transition: transform, 300ms, ease;
            &:hover{
                background-color: #C2595E;
                cursor: pointer;
                color: white;
                border: 1px solid #C2595E;

            }

        }

    }
     .buttonsignup{
            
            text-decoration: none;
            color: white;
            font-size: 17px;
            &:hover{
                font-weight: bold;
                text-decoration: underline;
            }
            
        }
}

</style>
