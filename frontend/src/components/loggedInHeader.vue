<template>
    <div class="header">
<router-link to="/Posts" class="imgrouter"><img src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania"></router-link>
<div class="link">
<router-link to="/userinfo" class="liens">Mon compte</router-link>
<a class="liens" @click="deconnexion">Deconnexion</a>
</div>

    </div>
</template>

<script>

export default {
    name: 'loggedInHeader',
    methods: {
        deconnexion() {
        localStorage.clear()
        this.$router.push('/');
        }
    }
}
</script>

<style lang="scss">
.header{
    background-color: #0F1E41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    padding: 10px;
    height: 5vh;
    .imgrouter{
        padding: none;
        margin: none;
        height: 100%;
    }
    img{
        width: 30%;
        height: 100%;
        object-fit: cover;
        padding: none;
        margin: none;
    }
    .liens{
        color: white;
        text-decoration: none;
        padding-right: 50px;
        &:hover{
            cursor: pointer;
            text-decoration:underline;
            font-weight: bold;
        }
    }
}
@media screen and (max-width: 425px){
    .header{
    background-color: #0F1E41;
    display: flex;
    align-items: center;
    padding: 5px;
    height: 5vh;
    .imgrouter{
        padding: none;
        margin: none;
    }
    img{
        display: none;
    }
    p{
        display: none;
    }
}
}
</style>