<template>
    <div class="header">
<router-link to="/" class="imgrouter"><img src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania"></router-link>
<p>Bienvenue chez Groupomania, votre réseau social d'entreprise !</p>
    </div>
</template>

<script>

export default {
    name: 'Header',
}
</script>

<style lang="scss">
.header{
    background-color: #0F1E41;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 5vh;
    margin-bottom: 30px;
    .imgrouter{
        padding: none;
        margin: none;
    }
    img{
        width: 30%;
        height: 100%;
        object-fit: cover;
        padding: none;
        margin: none;
    }
    p{
        color: white;
    }
}
@media screen and (max-width: 425px){
    .header{
    background-color: #0F1E41;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 5vh;
    .imgrouter{
        padding: none;
        margin: none;
    }
    img{
        width: 80%;
        height: 100%;
        padding: none;
        margin: none;
        
    }

    p{
        display: none;
    }
}
}
</style>