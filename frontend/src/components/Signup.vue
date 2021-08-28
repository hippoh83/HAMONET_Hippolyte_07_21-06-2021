<template>
    <div class="login">
        <div class="loginform">
            <h1>Inscription</h1>
    <form @submit.prevent = signup()>
      <input class="form userName" required type="text" placeholder="votre pseudo" v-model="userName" />
        <input class="form email" required type="email" placeholder="email" v-model="email" />
        <input class="form password" required type="password" placeholder="Mot de passe" v-model="password" />
        <button class="buttonlogin" type="submit">Inscription</button> <br>
        
    </form>
    <router-link to="/" class="buttonsignup">
    Vous avez déjâ un compte ? Connectez-vous !
    </router-link>
    <p class="error"></p>
    </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      Users: [],
      
      
    };
  },
  mounted() {
            this.getAllUsers();
            
        },
  methods: {
    getAllUsers(){
      axios.get("http://localhost:3000/api/auth/", {
        headers: {
            'Content-Type': 'application/json',
            
        }
        })
        .then((res) => {
            for(let i of res.data.user){
            this.Users.push(i.userName);
            }
            
            
        })
        .catch((error) => console.log(error));
    },


    signup() {
      
      const userName = this.userName;
      const email = this.email;
      const password = this.password;
      const regpassword = !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))

      if ( password.length > 0 && userName.length > 0 && email.length > 0) {
         
          if(this.Users.includes(userName)){
            document.querySelector(".error").innerHTML = `Ce nom d'utilisateur existe déjâ.`;
          } else if (regpassword){
            document.querySelector(".error").innerHTML = `Le mot de passe doit contenir 8 caractères, avoir au moins une lettre et un chiffre.`;
          } else {
            axios.post("http://localhost:3000/api/auth/signup",
            {
              userName,
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
            this.$router.push('/')
            }) 
        .catch(() => {
        document.querySelector(".error").innerHTML = `Cet email existe déjâ.`;
      });
          }
        
      }
   }
  } 
};

</script>
<style lang="scss">
.error{
  padding-top: 15px;
  color: red;
}
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
